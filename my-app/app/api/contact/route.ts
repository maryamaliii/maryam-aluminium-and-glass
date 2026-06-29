import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";
import { sendContactNotification } from "@/lib/email";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateMap = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown";

    if (isRateLimited(ip)) {
      return errorResponse("Too many requests. Please try again later.", 429);
    }

    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const { name, email, phone, message, _hp } = parsed.data;

    if (_hp) {
      return successResponse(
        { message: "Message sent successfully! We'll get back to you soon." },
        201
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone, message },
    });

    // Async email notification (non-blocking, errors logged internally)
    sendContactNotification({
      name,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString(),
      ipAddress: ip,
    });

    return successResponse(
      { id: submission.id, message: "Message sent successfully! We'll get back to you soon." },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}

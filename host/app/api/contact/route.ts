import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const { name, email, phone, message } = parsed.data;

    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone, message },
    });

    // Async email notification (non-blocking)
    sendContactNotification({ name, email, phone, message }).catch(console.error);

    return successResponse(
      { id: submission.id, message: "Message sent successfully! We'll get back to you soon." },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}

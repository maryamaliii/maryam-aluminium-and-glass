import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { quoteRequestSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";
import { sendQuoteNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quoteRequestSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const { clientName, email, phone, serviceId, projectScope, timeline, location, budget } = parsed.data;

    let serviceName: string | undefined;
    if (serviceId) {
      const service = await prisma.service.findUnique({
        where: { id: serviceId },
        select: { title: true },
      });
      serviceName = service?.title;
    }

    const quote = await prisma.quoteRequest.create({
      data: { clientName, email, phone, serviceId, projectScope, timeline, location, budget },
    });

    sendQuoteNotification({ clientName, email, phone, projectScope, serviceName, timeline: timeline || undefined, location: location || undefined, budget: budget || undefined }).catch(console.error);

    return successResponse(
      { id: quote.id, message: "Quote request submitted successfully! We'll get back to you within 24 hours." },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}

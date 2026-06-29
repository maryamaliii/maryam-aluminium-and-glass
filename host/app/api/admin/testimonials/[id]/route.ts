import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAuth(request);

    const { id } = await params;

    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) return errorResponse("Testimonial not found", 404);

    return successResponse(testimonial);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAuth(request);

    const { id } = await params;
    const body = await request.json();
    const parsed = testimonialSchema.partial().safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) return errorResponse("Testimonial not found", 404);

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: parsed.data,
    });

    return successResponse(testimonial);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAuth(request);

    const { id } = await params;

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) return errorResponse("Testimonial not found", 404);

    await prisma.testimonial.delete({ where: { id } });

    return successResponse({ message: "Testimonial deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { faqSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAuth(request);

    const { id } = await params;

    const faq = await prisma.fAQ.findUnique({ where: { id } });
    if (!faq) return errorResponse("FAQ not found", 404);

    return successResponse(faq);
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
    const parsed = faqSchema.partial().safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const existing = await prisma.fAQ.findUnique({ where: { id } });
    if (!existing) return errorResponse("FAQ not found", 404);

    const faq = await prisma.fAQ.update({
      where: { id },
      data: parsed.data,
    });

    return successResponse(faq);
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

    const existing = await prisma.fAQ.findUnique({ where: { id } });
    if (!existing) return errorResponse("FAQ not found", 404);

    await prisma.fAQ.delete({ where: { id } });

    return successResponse({ message: "FAQ deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}

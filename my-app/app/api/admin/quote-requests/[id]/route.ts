import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAuth(request);

    const { id } = await params;

    const quote = await prisma.quoteRequest.findUnique({
      where: { id },
      include: { service: { select: { title: true, slug: true } } },
    });
    if (!quote) return errorResponse("Quote request not found", 404);

    return successResponse(quote);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAuth(request);

    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    const existing = await prisma.quoteRequest.findUnique({ where: { id } });
    if (!existing) return errorResponse("Quote request not found", 404);

    const updateData: Record<string, unknown> = {};
    if (status) {
      const validStatuses = ["NEW", "QUOTE_SENT", "NEGOTIATING", "WON", "LOST"];
      if (!validStatuses.includes(status)) return errorResponse("Invalid status", 422);
      updateData.status = status;
    }
    if (notes !== undefined) updateData.notes = notes;

    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: updateData,
      include: { service: { select: { title: true, slug: true } } },
    });

    return successResponse(quote);
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

    const existing = await prisma.quoteRequest.findUnique({ where: { id } });
    if (!existing) return errorResponse("Quote request not found", 404);

    await prisma.quoteRequest.delete({ where: { id } });

    return successResponse({ message: "Quote request deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}

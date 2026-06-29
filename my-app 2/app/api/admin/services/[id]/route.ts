import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { serviceSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        _count: { select: { projects: true } },
      },
    });

    if (!service) return errorResponse("Service not found", 404);

    return successResponse(service);
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
    const parsed = serviceSchema.partial().safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) return errorResponse("Service not found", 404);

    if (parsed.data.slug && parsed.data.slug !== existing.slug) {
      const slugExists = await prisma.service.findUnique({
        where: { slug: parsed.data.slug },
      });
      if (slugExists) return errorResponse("Slug already in use", 409);
    }

    const service = await prisma.service.update({
      where: { id },
      data: parsed.data,
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    return successResponse(service);
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

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) return errorResponse("Service not found", 404);

    await prisma.service.delete({ where: { id } });

    return successResponse({ message: "Service deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}

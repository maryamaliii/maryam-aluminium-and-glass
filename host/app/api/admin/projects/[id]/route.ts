import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAuth(request);

    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: { service: { select: { id: true, title: true, slug: true } } },
    });

    if (!project) return errorResponse("Project not found", 404);

    return successResponse(project);
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
    const parsed = projectSchema.partial().safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return errorResponse("Project not found", 404);

    if (parsed.data.slug && parsed.data.slug !== existing.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug: parsed.data.slug },
      });
      if (slugExists) return errorResponse("Slug already in use", 409);
    }

    if (parsed.data.serviceId) {
      const service = await prisma.service.findUnique({
        where: { id: parsed.data.serviceId },
      });
      if (!service) return errorResponse("Service not found", 404);
    }

    const project = await prisma.project.update({
      where: { id },
      data: parsed.data,
      include: { service: { select: { id: true, title: true, slug: true } } },
    });

    return successResponse(project);
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

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return errorResponse("Project not found", 404);

    await prisma.project.delete({ where: { id } });

    return successResponse({ message: "Project deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}

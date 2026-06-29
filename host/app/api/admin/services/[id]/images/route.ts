import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAuth(request);

    const { id } = await params;
    const body = await request.json();
    const { images } = body;

    if (!images || !Array.isArray(images)) {
      return errorResponse("Images array is required", 400);
    }

    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return errorResponse("Service not found", 404);

    await prisma.serviceImage.createMany({
      data: images.map((img: { url: string; alt?: string }, idx: number) => ({
        serviceId: id,
        url: img.url,
        alt: img.alt || null,
        sortOrder: idx,
      })),
    });

    const updatedImages = await prisma.serviceImage.findMany({
      where: { serviceId: id },
      orderBy: { sortOrder: "asc" },
    });

    return successResponse(updatedImages, 201);
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
    const { images } = body;

    if (!images || !Array.isArray(images)) {
      return errorResponse("Images array is required", 400);
    }

    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return errorResponse("Service not found", 404);

    await prisma.serviceImage.deleteMany({ where: { serviceId: id } });

    await prisma.serviceImage.createMany({
      data: images.map((img: { url: string; alt?: string }, idx: number) => ({
        serviceId: id,
        url: img.url,
        alt: img.alt || null,
        sortOrder: idx,
      })),
    });

    const updatedImages = await prisma.serviceImage.findMany({
      where: { serviceId: id },
      orderBy: { sortOrder: "asc" },
    });

    return successResponse(updatedImages);
  } catch (error) {
    return handleApiError(error);
  }
}

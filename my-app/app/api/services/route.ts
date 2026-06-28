import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const service = await prisma.service.findUnique({
        where: { slug, isActive: true },
        include: {
          images: { orderBy: { sortOrder: "asc" } },
        },
      });

      if (!service) {
        return new Response(
          JSON.stringify({ success: false, error: "Service not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      return successResponse(service);
    }

    const services = await prisma.service.findMany({
      where: { isActive: true },
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return successResponse(services);
  } catch (error) {
    return handleApiError(error);
  }
}

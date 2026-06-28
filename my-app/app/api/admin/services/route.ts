import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { serviceSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    requireAuth(request);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    const where = search
      ? { title: { contains: search, mode: "insensitive" as const } }
      : {};

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          _count: { select: { projects: true } },
        },
        orderBy: { sortOrder: "asc" },
        skip,
        take: limit,
      }),
      prisma.service.count({ where }),
    ]);

    return successResponse({ services, total, page, limit });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const existing = await prisma.service.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existing) {
      return errorResponse("A service with this slug already exists", 409);
    }

    const service = await prisma.service.create({
      data: parsed.data,
      include: { images: true },
    });

    return successResponse(service, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

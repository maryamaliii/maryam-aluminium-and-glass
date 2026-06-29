import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    requireAuth(request);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";
    const serviceId = searchParams.get("serviceId") || "";
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.title = { contains: search, mode: "insensitive" as const };
    }
    if (serviceId) {
      where.serviceId = serviceId;
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: { service: { select: { id: true, title: true, slug: true } } },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    return successResponse({ projects, total, page, limit });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const existing = await prisma.project.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existing) {
      return errorResponse("A project with this slug already exists", 409);
    }

    const service = await prisma.service.findUnique({
      where: { id: parsed.data.serviceId },
    });
    if (!service) return errorResponse("Service not found", 404);

    const project = await prisma.project.create({
      data: parsed.data,
      include: { service: { select: { id: true, title: true, slug: true } } },
    });

    return successResponse(project, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

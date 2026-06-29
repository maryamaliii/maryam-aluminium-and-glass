import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectFilterSchema } from "@/lib/validations";
import { successResponse, handleApiError } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const parsed = projectFilterSchema.safeParse(params);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid filter parameters" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { serviceSlug, featured, limit } = parsed.data;

    const where: Record<string, unknown> = { isActive: true };

    if (featured) {
      where.isFeatured = true;
    }

    if (serviceSlug) {
      where.service = { slug: serviceSlug };
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        service: {
          select: { title: true, slug: true },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      ...(limit ? { take: limit } : {}),
    });

    const total = await prisma.project.count({ where });

    return successResponse({ projects, total });
  } catch (error) {
    return handleApiError(error);
  }
}

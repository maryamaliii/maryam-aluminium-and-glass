import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";
import type { SubmissionStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    requireAuth(request);

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (statusParam) {
      where.status = statusParam as SubmissionStatus;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
        { phone: { contains: search, mode: "insensitive" as const } },
      ];
    }

    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return successResponse({ submissions, total, page, limit });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return errorResponse("Submission ID is required", 400);
    }

    const existing = await prisma.contactSubmission.findUnique({ where: { id } });
    if (!existing) return errorResponse("Submission not found", 404);

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status as SubmissionStatus;
    if (notes !== undefined) updateData.notes = notes;
    if (status === "READ") updateData.readAt = new Date();

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: updateData,
    });

    return successResponse(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

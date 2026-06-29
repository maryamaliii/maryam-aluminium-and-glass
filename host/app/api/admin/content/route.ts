import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { contentUpdateSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    requireAuth(request);

    const allContent = await prisma.siteContent.findMany({
      orderBy: { key: "asc" },
    });

    return successResponse(allContent);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();
    const { key, value } = body;

    if (!key) {
      return errorResponse("Content key is required", 400);
    }

    const parsed = contentUpdateSchema.safeParse({ value });
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const existing = await prisma.siteContent.findUnique({ where: { key } });
    if (!existing) return errorResponse("Content not found", 404);

    const updated = await prisma.siteContent.update({
      where: { key },
      data: { value: parsed.data.value },
    });

    return successResponse(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

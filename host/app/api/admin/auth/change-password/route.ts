import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, hashPassword, verifyPassword } from "@/lib/auth";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";
import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters").max(100),
});

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);

    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: user.userId },
    });

    if (!admin) return errorResponse("User not found", 404);

    const valid = await verifyPassword(parsed.data.currentPassword, admin.passwordHash);
    if (!valid) return errorResponse("Current password is incorrect", 401);

    const passwordHash = await hashPassword(parsed.data.newPassword);

    await prisma.adminUser.update({
      where: { id: user.userId },
      data: { passwordHash },
    });

    return successResponse({ message: "Password changed successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { hashPassword } from "@/lib/auth";
import { adminUpdateSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireRole("SUPER_ADMIN")(_request);

    const { id } = await params;

    const admin = await prisma.adminUser.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!admin) return errorResponse("Admin not found", 404);

    return successResponse(admin);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireRole("SUPER_ADMIN")(request);

    const { id } = await params;
    const body = await request.json();
    const parsed = adminUpdateSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return errorResponse(firstError, 422);
    }

    const existing = await prisma.adminUser.findUnique({ where: { id } });
    if (!existing) return errorResponse("Admin not found", 404);

    if (parsed.data.email && parsed.data.email !== existing.email) {
      const emailExists = await prisma.adminUser.findUnique({
        where: { email: parsed.data.email },
      });
      if (emailExists) return errorResponse("Email already in use", 409);
    }

    const updateData: Record<string, unknown> = {};
    if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
    if (parsed.data.email !== undefined) updateData.email = parsed.data.email;
    if (parsed.data.role !== undefined) updateData.role = parsed.data.role;
    if (parsed.data.isActive !== undefined) updateData.isActive = parsed.data.isActive;
    if (parsed.data.password) {
      updateData.passwordHash = await hashPassword(parsed.data.password);
    }

    const admin = await prisma.adminUser.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return successResponse(admin);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireRole("SUPER_ADMIN")(request);

    const { id } = await params;

    const admin = await prisma.adminUser.findUnique({ where: { id } });
    if (!admin) return errorResponse("Admin not found", 404);

    const superAdminCount = await prisma.adminUser.count({
      where: { role: "SUPER_ADMIN" },
    });

    if (admin.role === "SUPER_ADMIN" && superAdminCount <= 1) {
      return errorResponse("Cannot delete the last super admin", 403);
    }

    await prisma.adminUser.delete({ where: { id } });

    return successResponse({ message: "Admin deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { successResponse, handleApiError } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    requireAuth(request);

    const [
      totalServices,
      totalProjects,
      totalContacts,
      newContacts,
      featuredProjects,
      activeAdmins,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.project.count({ where: { isFeatured: true } }),
      prisma.adminUser.count({ where: { isActive: true } }),
    ]);

    return successResponse({
      totalServices,
      totalProjects,
      totalContacts,
      newContacts,
      featuredProjects,
      activeAdmins,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

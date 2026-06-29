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
      totalTestimonials,
      totalFaqs,
      totalQuoteRequests,
      newQuoteRequests,
      wonQuoteRequests,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.project.count({ where: { isFeatured: true } }),
      prisma.adminUser.count({ where: { isActive: true } }),
      prisma.testimonial.count(),
      prisma.fAQ.count(),
      prisma.quoteRequest.count(),
      prisma.quoteRequest.count({ where: { status: "NEW" } }),
      prisma.quoteRequest.count({ where: { status: "WON" } }),
    ]);

    const conversionRate = totalQuoteRequests > 0
      ? Math.round((wonQuoteRequests / totalQuoteRequests) * 100)
      : 0;

    return successResponse({
      totalServices,
      totalProjects,
      totalContacts,
      newContacts,
      featuredProjects,
      activeAdmins,
      totalTestimonials,
      totalFaqs,
      totalQuoteRequests,
      newQuoteRequests,
      wonQuoteRequests,
      conversionRate,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

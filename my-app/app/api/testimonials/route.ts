import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return successResponse(testimonials);
  } catch (error) {
    return handleApiError(error);
  }
}

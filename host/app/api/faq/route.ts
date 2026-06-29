import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return successResponse(faqs);
  } catch (error) {
    return handleApiError(error);
  }
}

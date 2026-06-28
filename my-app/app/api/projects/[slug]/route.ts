import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError } from "@/lib/api-response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const project = await prisma.project.findUnique({
      where: { slug, isActive: true },
      include: {
        service: {
          select: { title: true, slug: true, description: true },
        },
      },
    });

    if (!project) {
      return new Response(
        JSON.stringify({ success: false, error: "Project not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return successResponse(project);
  } catch (error) {
    return handleApiError(error);
  }
}

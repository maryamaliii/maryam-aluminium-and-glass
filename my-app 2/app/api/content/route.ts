import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (key) {
      const content = await prisma.siteContent.findUnique({ where: { key } });
      if (!content) {
        return new Response(
          JSON.stringify({ success: false, error: "Content not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
      return successResponse(content);
    }

    const allContent = await prisma.siteContent.findMany();
    const contentMap = allContent.reduce(
      (acc, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      {} as Record<string, string>
    );

    return successResponse(contentMap);
  } catch (error) {
    return handleApiError(error);
  }
}

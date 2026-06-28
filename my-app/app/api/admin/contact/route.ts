import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

const VALID_CONTACT_STATUSES = ["NEW", "READ", "REPLIED", "ARCHIVED"] as const;

export async function GET(request: NextRequest) {
  try {
    requireAuth(request);

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");

    if (format === "csv") {
      return handleCsvExport(request);
    }

    const statusParam = searchParams.get("status");
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (statusParam && VALID_CONTACT_STATUSES.includes(statusParam as typeof VALID_CONTACT_STATUSES[number])) {
      where.status = statusParam;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
        { phone: { contains: search, mode: "insensitive" as const } },
        { message: { contains: search, mode: "insensitive" as const } },
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

async function handleCsvExport(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status");

    const where: Record<string, unknown> = {};
  if (statusParam && VALID_CONTACT_STATUSES.includes(statusParam as typeof VALID_CONTACT_STATUSES[number])) where.status = statusParam;

  const submissions = await prisma.contactSubmission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const header = "Name,Email,Phone,Message,Status,Date,Notes\n";
  const rows = submissions.map((s) => {
    const date = s.createdAt.toISOString().split("T")[0];
    const msg = `"${(s.message || "").replace(/"/g, '""')}"`;
    const notes = s.notes ? `"${s.notes.replace(/"/g, '""')}"` : "";
    return `${s.name},${s.email},${s.phone},${msg},${s.status},${date},${notes}`;
  }).join("\n");

  const csv = header + rows;

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contact-submissions-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
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
    if (status) {
      if (!VALID_CONTACT_STATUSES.includes(status)) return errorResponse("Invalid status", 422);
      updateData.status = status;
      if (status === "READ") updateData.readAt = new Date();
    }
    if (notes !== undefined) updateData.notes = notes;

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: updateData,
    });

    return successResponse(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

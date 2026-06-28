import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

export function successResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(error: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error }, { status });
}

export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";
  const status =
    message === "Unauthorized" ? 401 :
    message.includes("not found") ? 404 :
    500;
  return NextResponse.json({ success: false, error: message }, { status });
}

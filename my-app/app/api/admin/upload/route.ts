import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { uploadImage, deleteImage, getPublicIdFromUrl } from "@/lib/cloudinary";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    requireAuth(request);

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "meer-engineering";

    if (!file) {
      return errorResponse("No file provided", 400);
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse("Invalid file type. Allowed: JPEG, PNG, WebP, AVIF", 400);
    }

    if (file.size > 10 * 1024 * 1024) {
      return errorResponse("File too large. Maximum size is 10MB", 400);
    }

    const result = await uploadImage(file, folder);

    return successResponse(result, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    requireAuth(request);

    const { url } = await request.json();

    if (!url) {
      return errorResponse("Image URL is required", 400);
    }

    const publicId = getPublicIdFromUrl(url);
    if (!publicId) {
      return errorResponse("Could not extract public ID from URL", 400);
    }

    await deleteImage(publicId);

    return successResponse({ message: "Image deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}

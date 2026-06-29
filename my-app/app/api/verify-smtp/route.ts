import { NextResponse } from "next/server";
import { verifySmtpConnection } from "@/lib/email";

export async function GET() {
  console.log("[SMTP] Manual verification requested");
  const ok = await verifySmtpConnection();
  return NextResponse.json({
    success: ok,
    message: ok
      ? "SMTP connection verified successfully"
      : "SMTP verification failed — check server logs for details",
  });
}

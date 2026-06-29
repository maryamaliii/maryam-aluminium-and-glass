import nodemailer from "nodemailer";

const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "",
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

const isConfigured = () =>
  !!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASS;

const smtpFrom =
  process.env.SMTP_FROM || `"Meer Engineering" <${process.env.SMTP_USER}>`;

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function verifySmtpConnection(): Promise<boolean> {
  if (!isConfigured()) {
    console.log("[SMTP] Not configured — skipping verification");
    return false;
  }
  try {
    await transporter.verify();
    console.log("[SMTP] Connection verified successfully");
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[SMTP] Verification failed:", message);
    return false;
  }
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  ipAddress: string;
}) {
  if (!isConfigured()) {
    console.log("[Email] SMTP not configured — skipping contact notification");
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || "info@meerengineering.com";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const formattedDate = new Date(data.submittedAt).toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
    dateStyle: "full",
    timeStyle: "long",
  });

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: adminEmail,
      subject: "New Contact Form Submission - Meer Engineering",
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.name)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.phone)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.message)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Date / Time</td><td style="padding:8px;border:1px solid #ddd">${sanitize(formattedDate)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">IP Address</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.ipAddress)}</td></tr>
        </table>
        <p style="margin-top:20px;color:#666">View all inquiries: <a href="${sanitize(baseUrl)}/admin/leads">Admin Dashboard</a></p>
      `,
    });
    console.log("[Email] Contact notification sent successfully to", adminEmail);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Email] Failed to send contact notification:", message);
  }
}

export async function sendQuoteNotification(data: {
  clientName: string;
  email: string;
  phone: string;
  projectScope: string;
  serviceName?: string;
  timeline?: string;
  location?: string;
  budget?: string;
}) {
  if (!isConfigured()) {
    console.log("[Email] SMTP not configured — skipping quote notification");
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || "info@meerengineering.com";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: adminEmail,
      subject: `New Quote Request from ${sanitize(data.clientName)}`,
      html: `
        <h2>New Quote Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Client</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.clientName)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.phone)}</td></tr>
          ${data.serviceName ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Service</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.serviceName)}</td></tr>` : ""}
          ${data.location ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Location</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.location)}</td></tr>` : ""}
          ${data.timeline ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Timeline</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.timeline)}</td></tr>` : ""}
          ${data.budget ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Budget</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.budget)}</td></tr>` : ""}
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Project Scope</td><td style="padding:8px;border:1px solid #ddd">${sanitize(data.projectScope)}</td></tr>
        </table>
        <p style="margin-top:20px;color:#666">View all quotes: <a href="${sanitize(baseUrl)}/admin/quote-requests">Admin Dashboard</a></p>
      `,
    });
    console.log("[Email] Quote notification sent successfully to", adminEmail);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Email] Failed to send quote notification:", message);
  }
}

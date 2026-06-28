import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import type { AdminRole } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-production";
const SALT_ROUNDS = 12;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: AdminRole;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function getAuthUser(request: NextRequest): JwtPayload | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  return verifyToken(token);
}

export function requireAuth(request: NextRequest): JwtPayload {
  const user = getAuthUser(request);
  if (!user) throw new Error("Unauthorized");
  return user;
}

export function requireRole(...roles: AdminRole[]) {
  return (request: NextRequest): JwtPayload => {
    const user = requireAuth(request);
    if (!roles.includes(user.role)) {
      throw new Error("Forbidden: Insufficient permissions");
    }
    return user;
  };
}

export function isSuperAdmin(request: NextRequest): boolean {
  const user = getAuthUser(request);
  return user?.role === "SUPER_ADMIN";
}

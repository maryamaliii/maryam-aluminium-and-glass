import type { ServiceCategory, SubmissionStatus, AdminRole } from "@prisma/client";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ProjectResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  serviceId: string;
  service: { title: string; slug: string };
  image: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface ServiceResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ServiceCategory;
  icon: string;
  sortOrder: number;
  isActive: boolean;
  images: { id: string; url: string; alt: string | null; sortOrder: number }[];
}

export interface ContactSubmissionResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: SubmissionStatus;
  createdAt: string;
  readAt: string | null;
  notes: string | null;
}

export interface AdminUserResponse {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  user: { id: string; email: string; name: string; role: AdminRole };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

export interface DashboardStats {
  totalServices: number;
  totalProjects: number;
  totalContacts: number;
  newContacts: number;
  featuredProjects: number;
  activeAdmins: number;
}

import { z } from "zod";

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(100, "Name must be 100 characters or less")
    .transform(stripHtml),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(4, "Phone number is required")
    .max(20, "Phone number must be 20 characters or less")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be 2000 characters or less")
    .transform(stripHtml),
});

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  password: z.string().trim().min(1, "Password is required"),
});

export const projectFilterSchema = z.object({
  serviceSlug: z.string().optional(),
  featured: z
    .string()
    .optional()
    .transform((val) => val === "true"),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
});

export const adminCreateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),
  role: z.enum(["SUPER_ADMIN", "ADMIN"]).default("ADMIN"),
});

export const adminUpdateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100).optional(),
  email: z.string().trim().email("Invalid email").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100)
    .optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN"]).optional(),
  isActive: z.boolean().optional(),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().trim().min(1, "Description is required").max(2000),
  category: z.enum([
    "MIRRORS",
    "KITCHEN",
    "WARDROBES",
    "CUSTOM_FABRICATION",
    "WINDOWS_DOORS",
    "PARTITIONS",
    "FIXTURES",
    "INSTALLATION",
  ]),
  icon: z.string().trim().min(1, "Icon is required"),
  sortOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().trim().min(1, "Description is required").max(2000),
  serviceId: z.string().min(1, "Service is required"),
  image: z.string().trim().min(1, "Image URL is required"),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const quoteRequestSchema = z.object({
  clientName: z.string().trim().min(1, "Name is required").max(200).transform(stripHtml),
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  phone: z
    .string()
    .trim()
    .min(4, "Phone is required")
    .max(20, "Phone must be 20 characters or less")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
  serviceId: z.string().optional().nullable(),
  projectScope: z.string().trim().min(10, "Please describe your project in more detail").max(5000).transform(stripHtml),
  timeline: z.string().trim().max(200).optional().nullable(),
  location: z.string().trim().max(200).optional().nullable(),
  budget: z.string().trim().max(200).optional().nullable(),
});

export const testimonialSchema = z.object({
  clientName: z.string().trim().min(1, "Client name is required").max(200),
  company: z.string().trim().max(200).optional().nullable(),
  role: z.string().trim().max(200).optional().nullable(),
  content: z.string().trim().min(10, "Content must be at least 10 characters").max(2000),
  rating: z.number().int().min(1).max(5).optional(),
  avatar: z.string().trim().optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const faqSchema = z.object({
  question: z.string().trim().min(1, "Question is required").max(500),
  answer: z.string().trim().min(1, "Answer is required").max(5000),
  category: z.string().trim().min(1, "Category is required").max(100),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const contentUpdateSchema = z.object({
  value: z.string().min(1, "Value is required"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AdminCreateInput = z.infer<typeof adminCreateSchema>;
export type AdminUpdateInput = z.infer<typeof adminUpdateSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type FAQInput = z.infer<typeof faqSchema>;
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

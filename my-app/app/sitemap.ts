import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meerengineering.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  try {
    const res = await fetch(`${BASE_URL}/api/services`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      const servicePages: MetadataRoute.Sitemap = data.data.map(
        (service: { slug: string; updatedAt?: string }) => ({
          url: `${BASE_URL}/services/${service.slug}`,
          lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })
      );
      staticPages.push(...servicePages);
    }
  } catch {
  }

  try {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (data.success && data.data?.projects) {
      const projectPages: MetadataRoute.Sitemap = data.data.projects.map(
        (project: { slug: string; updatedAt?: string }) => ({
          url: `${BASE_URL}/projects/${project.slug}`,
          lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })
      );
      staticPages.push(...projectPages);
    }
  } catch {
  }

  try {
    const res = await fetch(`${BASE_URL}/api/faq`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      const faqEntrySlugs = data.data
        .filter((faq: { slug?: string }) => faq.slug)
        .map((faq: { slug: string; updatedAt?: string }) => ({
          url: `${BASE_URL}/faq/${faq.slug}`,
          lastModified: faq.updatedAt ? new Date(faq.updatedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.5,
        }));
      staticPages.push(...faqEntrySlugs);
    }
  } catch {
  }

  return staticPages;
}

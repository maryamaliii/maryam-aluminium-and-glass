import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";
import SchemaBreadcrumb, { SchemaWebPage } from "@/components/SchemaBreadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meerengineering.com";

export const metadata: Metadata = {
  title: "Our Projects — Meer Engineering",
  description:
    "Explore our portfolio of premium aluminium and glass projects — residential and commercial installations crafted with precision. Windows, doors, partitions, wardrobes, and more.",
  openGraph: {
    title: "Our Projects — Meer Engineering | Aluminium & Glass Portfolio",
    description:
      "Browse Meer Engineering's premium aluminium and glass projects. Residential and commercial installations crafted with precision and attention to detail.",
    url: `${BASE_URL}/projects`,
  },
  alternates: {
    canonical: `${BASE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <SchemaBreadcrumb
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Projects", url: `${BASE_URL}/projects` },
        ]}
      />
      <SchemaWebPage
        title="Our Projects — Meer Engineering | Aluminium & Glass Portfolio"
        description="Browse Meer Engineering's premium aluminium and glass projects. Residential and commercial installations crafted with precision and attention to detail."
        url={`${BASE_URL}/projects`}
      />
      <ProjectsPageClient />
    </>
  );
}

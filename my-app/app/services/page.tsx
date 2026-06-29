import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import SchemaBreadcrumb, { SchemaWebPage } from "@/components/SchemaBreadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meerengineering.com";

export const metadata: Metadata = {
  title: "Our Services — Meer Engineering",
  description:
    "Comprehensive aluminium and glass services — aluminium windows, glass doors, mirrors, wardrobes, kitchen glass, glass partitions, custom fabrication, and professional installation in Pakistan.",
  openGraph: {
    title: "Our Services — Meer Engineering | Aluminium & Glass Services",
    description:
      "Expert aluminium fabrication and glass services in Pakistan. Windows, doors, mirrors, wardrobes, kitchen glass, partitions, custom fabrication, and installation.",
    url: `${BASE_URL}/services`,
  },
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <SchemaBreadcrumb
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/services` },
        ]}
      />
      <SchemaWebPage
        title="Our Services — Meer Engineering | Aluminium & Glass Services"
        description="Expert aluminium fabrication and glass services in Pakistan. Windows, doors, mirrors, wardrobes, kitchen glass, partitions, custom fabrication, and installation."
        url={`${BASE_URL}/services`}
      />
      <ServicesPageClient />
    </>
  );
}

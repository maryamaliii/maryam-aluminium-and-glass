import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import SchemaBreadcrumb, { SchemaWebPage } from "@/components/SchemaBreadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meerengineering.com";

export const metadata: Metadata = {
  title: "About Us — Meer Engineering",
  description:
    "Learn about Meer Engineering — over a decade of excellence in aluminium fabrication and glass innovation in Pakistan. Discover our story, values, and expertise in precision craftsmanship.",
  openGraph: {
    title: "About Us — Meer Engineering | Aluminium & Glass Experts",
    description:
      "Over a decade of excellence in aluminium fabrication and glass innovation in Pakistan. Precision craftsmanship, modern design, and reliable installation.",
    url: `${BASE_URL}/about`,
  },
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <SchemaBreadcrumb
        items={[
          { name: "Home", url: BASE_URL },
          { name: "About Us", url: `${BASE_URL}/about` },
        ]}
      />
      <SchemaWebPage
        title="About Us — Meer Engineering | Aluminium & Glass Experts"
        description="Over a decade of excellence in aluminium fabrication and glass innovation in Pakistan. Precision craftsmanship, modern design, and reliable installation."
        url={`${BASE_URL}/about`}
      />
      <AboutPageClient />
    </>
  );
}

import type { Metadata } from "next";
import PortfolioPageClient from "./PortfolioPageClient";
import SchemaBreadcrumb, { SchemaWebPage } from "@/components/SchemaBreadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meerengineering.com";

export const metadata: Metadata = {
  title: "Portfolio — Meer Engineering",
  description:
    "Browse Meer Engineering's portfolio — a curated collection of precision-crafted aluminium and glass solutions for residential and commercial spaces in Pakistan.",
  openGraph: {
    title: "Portfolio — Meer Engineering | Aluminium & Glass Portfolio",
    description:
      "Browse Meer Engineering's portfolio of precision-crafted aluminium and glass solutions for residential and commercial spaces across Pakistan.",
    url: `${BASE_URL}/portfolio`,
  },
  alternates: {
    canonical: `${BASE_URL}/portfolio`,
  },
};

export default function PortfolioPage() {
  return (
    <>
      <SchemaBreadcrumb
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Portfolio", url: `${BASE_URL}/portfolio` },
        ]}
      />
      <SchemaWebPage
        title="Portfolio — Meer Engineering | Aluminium & Glass Portfolio"
        description="Browse Meer Engineering's portfolio of precision-crafted aluminium and glass solutions for residential and commercial spaces across Pakistan."
        url={`${BASE_URL}/portfolio`}
      />
      <PortfolioPageClient />
    </>
  );
}

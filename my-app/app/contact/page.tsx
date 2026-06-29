import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import SchemaBreadcrumb, { SchemaWebPage } from "@/components/SchemaBreadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meerengineering.com";

export const metadata: Metadata = {
  title: "Contact Us — Meer Engineering",
  description:
    "Get in touch with Meer Engineering for a free consultation and quote. We serve residential and commercial clients across Pakistan. Call +92 323 3541250 or email us.",
  openGraph: {
    title: "Contact Us — Meer Engineering | Aluminium & Glass Experts",
    description:
      "Contact Meer Engineering for a free consultation. Expert aluminium fabrication and glass solutions for residential and commercial clients across Pakistan.",
    url: `${BASE_URL}/contact`,
  },
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <SchemaBreadcrumb
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Contact", url: `${BASE_URL}/contact` },
        ]}
      />
      <SchemaWebPage
        title="Contact Us — Meer Engineering | Aluminium & Glass Experts"
        description="Contact Meer Engineering for a free consultation. Expert aluminium fabrication and glass solutions for residential and commercial clients across Pakistan."
        url={`${BASE_URL}/contact`}
      />
      <ContactPageClient />
    </>
  );
}

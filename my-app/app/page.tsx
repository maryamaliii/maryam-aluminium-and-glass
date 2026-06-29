import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import SchemaBreadcrumb, { SchemaWebPage } from "@/components/SchemaBreadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meerengineering.com";

export const metadata: Metadata = {
  title: "Meer Engineering — Premium Aluminium & Glass Solutions in Pakistan",
  description:
    "Meer Engineering is Pakistan's trusted aluminium fabrication and glass company. Expert windows, doors, glass partitions, custom fabrication, wardrobes, and kitchen glass since 2015. Free consultation.",
  openGraph: {
    title: "Meer Engineering — Premium Aluminium & Glass Solutions in Pakistan",
    description:
      "Leading aluminium fabrication and glass company in Pakistan. Expert windows, doors, glass partitions, custom fabrication, wardrobes, mirrors, and kitchen glass since 2015.",
    url: BASE_URL,
    images: [{ url: `${BASE_URL}/bg.jpg`, width: 1200, height: 630, alt: "Meer Engineering — Aluminium and Glass Solutions" }],
  },
  twitter: {
    title: "Meer Engineering — Premium Aluminium & Glass Solutions in Pakistan",
    description:
      "Leading aluminium fabrication and glass company in Pakistan. Expert windows, doors, glass partitions, custom fabrication, wardrobes, mirrors, and kitchen glass.",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function HomePage() {
  return (
    <>
      <SchemaBreadcrumb items={[{ name: "Home", url: BASE_URL }]} />
      <SchemaWebPage
        title="Meer Engineering — Premium Aluminium & Glass Solutions in Pakistan"
        description="Meer Engineering is Pakistan's trusted aluminium fabrication and glass company. Expert windows, doors, glass partitions, custom fabrication, wardrobes, and kitchen glass since 2015."
        url={BASE_URL}
      />
      <HomePageClient />
    </>
  );
}

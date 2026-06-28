import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import WhatsAppButton from "../components/WhatsAppButton";
import StickyMobileCTA from "../components/StickyMobileCTA";
import Script from "next/script";
import "./globals.css";

// Heading font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Body font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meer-engineering.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Meer Engineering",
    template: "%s | Meer Engineering",
  },
  description:
    "Meer Engineering provides premium aluminium fabrication and modern glass solutions including windows, doors, and custom glass work.",
  keywords: [
    "Meer Engineering",
    "Aluminium and Glass",
    "Glass Work",
    "Aluminium Fabrication",
    "Windows and Doors",
    "Glass Solutions Pakistan",
    "Aluminium Fabrication Pakistan",
    "Custom Glass Work",
    "Glass Partitions",
    "Aluminium Windows",
  ],
  authors: [{ name: "Meer Engineering" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Meer Engineering",
    description:
      "Premium aluminium fabrication and modern glass solutions. Expert windows, doors, and custom glass work in Pakistan.",
    url: BASE_URL,
    siteName: "Meer Engineering",
    locale: "en_US",
    type: "website",
    images: [{ url: `${BASE_URL}/bg.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meer Engineering",
    description:
      "Premium aluminium fabrication and modern glass solutions in Pakistan.",
    images: [`${BASE_URL}/bg.jpg`],
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased flex min-h-screen flex-col`}
      >
        <Script
          id="schema-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Meer Engineering",
              description:
                "Premium aluminium fabrication and modern glass solutions. Specializing in windows, doors, mirrors, wardrobes, kitchen glass, partitions, custom fabrication, and installation.",
              url: process.env.NEXT_PUBLIC_APP_URL || "https://meer-engineering.vercel.app",
              telephone: "+923233541250",
              email: "harisanwarali@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK",
              },
              areaServed: "PK",
              priceRange: "$$",
              image: `${process.env.NEXT_PUBLIC_APP_URL || "https://meer-engineering.vercel.app"}/bg.jpg`,
              sameAs: [
                `https://wa.me/923233541250`,
              ],
            }),
          }}
        />
        <main className="flex-1 font-body pb-16 md:pb-0">{children}</main>
        <WhatsAppButton />
        <StickyMobileCTA />
      </body>
    </html>
  );
}

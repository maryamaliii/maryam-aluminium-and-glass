import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import WhatsAppButton from "../components/WhatsAppButton";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meerengineering.com";

export const metadata: Metadata = {
  title: {
    default: "Meer Engineering — Premium Aluminium & Glass Solutions in Pakistan",
    template: "%s | Meer Engineering — Aluminium & Glass Experts",
  },
  description:
    "Meer Engineering is a leading aluminium fabrication and glass company in Pakistan. Expert windows, doors, glass partitions, custom fabrication, wardrobes, mirrors, and kitchen glass. Free consultation.",
  keywords: [
    "Meer Engineering",
    "Aluminium and Glass",
    "Aluminium Fabrication Pakistan",
    "Glass Work Pakistan",
    "Aluminium Windows Pakistan",
    "Glass Doors Pakistan",
    "Glass Partitions",
    "Custom Glass Work",
    "Aluminium Fabrication Company",
    "Aluminium and Glass Company",
    "Aluminium Doors and Windows",
    "Glass Wardrobes Pakistan",
    "Mirror Works Pakistan",
    "Kitchen Glass Pakistan",
    "Commercial Glass Solutions",
    "Residential Aluminium Work",
    "Aluminium Fabrication near me",
    "Glass Installation Pakistan",
    "Storefront Glass Pakistan",
    "Aluminium Storefront",
  ],
  authors: [{ name: "Meer Engineering" }],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    title: "Meer Engineering — Premium Aluminium & Glass Solutions in Pakistan",
    description:
      "Leading aluminium fabrication and glass company in Pakistan. Expert windows, doors, glass partitions, custom fabrication, wardrobes, mirrors, and kitchen glass.",
    url: BASE_URL,
    siteName: "Meer Engineering",
    locale: "en_US",
    type: "website",
    images: [{ url: `${BASE_URL}/bg.jpg`, width: 1200, height: 630, alt: "Meer Engineering — Aluminium and Glass Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meer Engineering — Premium Aluminium & Glass Solutions",
    description:
      "Leading aluminium fabrication and glass company in Pakistan. Expert windows, doors, partitions, and custom work.",
    images: [`${BASE_URL}/bg.jpg`],
    site: "@meerengineering",
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  appleWebApp: {
    capable: true,
    title: "Meer Engineering",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    "theme-color": "#0a0a0a",
    "msapplication-TileColor": "#0a0a0a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preload" as="image" href="/bg.webp" type="image/webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased flex min-h-screen flex-col`}
      >
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${BASE_URL}/#organization`,
              name: "Meer Engineering",
              url: BASE_URL,
              logo: `${BASE_URL}/favicon.svg`,
              description:
                "Premium aluminium fabrication and modern glass solutions in Pakistan. Specializing in windows, doors, mirrors, wardrobes, kitchen glass, partitions, custom fabrication, and installation.",
              sameAs: [
                `https://wa.me/923233541250`,
              ],
            }),
          }}
        />
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${BASE_URL}/#local-business`,
              name: "Meer Engineering",
              description:
                "Premium aluminium fabrication and modern glass solutions. Specializing in windows, doors, mirrors, wardrobes, kitchen glass, partitions, custom fabrication, and installation.",
              url: BASE_URL,
              telephone: "+923233541250",
              email: "harisanwarali@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK",
              },
              areaServed: ["PK", "Pakistan"],
              priceRange: "$$",
              image: `${BASE_URL}/bg.jpg`,
              founder: {
                "@type": "Person",
                name: "Haris Anwar Ali",
              },
              foundingDate: "2015",
              openingHours: "Mo-Su 00:00-23:59",
              sameAs: [
                `https://wa.me/923233541250`,
              ],
              parentOrganization: {
                "@id": `${BASE_URL}/#organization`,
              },
            }),
          }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${BASE_URL}/#website`,
              name: "Meer Engineering",
              url: BASE_URL,
              description:
                "Premium aluminium fabrication and modern glass solutions in Pakistan.",
              publisher: {
                "@id": `${BASE_URL}/#organization`,
              },
              inLanguage: "en-US",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <main id="main-content" className="flex-1 font-body" role="main">
          {children}
        </main>
        <WhatsAppButton />
      </body>
    </html>
  );
}

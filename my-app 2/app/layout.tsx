import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import WhatsAppButton from "../components/WhatsAppButton";
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

export const metadata: Metadata = {
  title: {
    default: "Meer Architectural Glass & Aluminium",
    template: "%s | Meer Architectural Glass & Aluminium",
  },
  description:
    "Meer Architectural Glass & Aluminium provides premium aluminium fabrication and modern glass solutions including windows, doors, partitions, and custom fabrication for residential and commercial projects.",
  keywords: [
    "Meer Architectural",
    "Aluminium and Glass",
    "Glass Work",
    "Aluminium Fabrication",
    "Windows and Doors",
    "Glass Partitions",
    "Architectural Glass",
  ],
  authors: [{ name: "Meer Architectural Glass & Aluminium" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Meer Architectural Glass & Aluminium",
    description: "Premium aluminium fabrication and modern glass solutions for residential and commercial spaces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased flex min-h-screen flex-col`}
      >
        <main className="flex-1 font-body">{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  );
}

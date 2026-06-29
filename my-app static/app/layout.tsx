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
    default: "Maryam Aluminium & Glass",
    template: "%s | Maryam Aluminium & Glass",
  },
  description:
    "Maryam Aluminium & Glass provides premium aluminium fabrication and modern glass solutions including windows, doors, and custom glass work.",
  keywords: [
    "Maryam Aluminium",
    "Aluminium and Glass",
    "Glass Work",
    "Aluminium Fabrication",
    "Windows and Doors",
  ],
  authors: [{ name: "Maryam Aluminium & Glass" }],
  robots: {
    index: true,
    follow: true,
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

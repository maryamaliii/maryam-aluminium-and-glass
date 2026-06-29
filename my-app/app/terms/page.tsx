import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meerengineering.com";

export const metadata: Metadata = {
  title: "Terms & Conditions — Meer Engineering",
  description: "Terms and Conditions for Meer Engineering. Understand the terms of service for our aluminium fabrication and glass solutions in Pakistan.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${BASE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
          <p>Last updated: June 2026</p>
          <p>
            These Terms and Conditions govern your use of the Meer Engineering website and services. By using our services, you agree to these terms.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8">Services</h2>
          <p>
            Meer Engineering provides aluminium fabrication and glass solutions including windows, doors, partitions, wardrobes, mirrors, kitchen glass, custom fabrication, and installation services.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8">Quotes and Pricing</h2>
          <p>
            All quotes provided are valid for 30 days unless otherwise stated. Prices are subject to change based on material costs and project scope.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8">Limitation of Liability</h2>
          <p>
            Meer Engineering shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8">Contact Us</h2>
          <p>
            For questions about these terms, contact us at{' '}
            <a href="mailto:info@meerengineering.com" className="text-blue-400 hover:underline">info@meerengineering.com</a>{' '}
            or call <a href="tel:+923233541250" className="text-blue-400 hover:underline">+92 323 3541250</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

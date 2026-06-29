import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://meerengineering.com";

export const metadata: Metadata = {
  title: "Privacy Policy — Meer Engineering",
  description: "Privacy Policy for Meer Engineering. Learn how we collect, use, and protect your personal information when you use our aluminium and glass services.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${BASE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
          <p>Last updated: June 2026</p>
          <p>
            Meer Engineering respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and project details when you fill out our contact form or request a quote.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8">How We Use Your Information</h2>
          <p>
            We use the information we collect to respond to your inquiries, provide quotes, deliver services, and improve our website and customer experience.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8">Data Protection</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information when you submit a request or enter your details.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:harisanwarali@gmail.com" className="text-blue-400 hover:underline">harisanwarali@gmail.com</a>{' '}
            or call <a href="tel:+923233541250" className="text-blue-400 hover:underline">+92 323 3541250</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

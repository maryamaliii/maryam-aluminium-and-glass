"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";

interface Service {
  id: string;
  title: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function QuoteRequestForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    serviceId: "",
    projectScope: "",
    timeline: "",
    location: "",
    budget: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => { if (data.success) setServices(data.data); })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ clientName: "", email: "", phone: "", serviceId: "", projectScope: "", timeline: "", location: "", budget: "" });
      } else {
        setError(data.error?.message || data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      id="get-quote"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Request a Quote</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Tell us about your project and we&apos;ll provide a detailed quote within 24 hours.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 sm:p-6 lg:p-8"
        >
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quote Request Sent!</h3>
              <p className="text-gray-300 mb-6">We&apos;ll review your project and get back to you within 24 hours.</p>
              <button onClick={() => setSuccess(false)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-200 mb-1.5">Full Name *</label>
                  <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleChange} required
                    placeholder="Your name" autoComplete="name"
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1.5">Email *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="your@email.com" autoComplete="email"
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1.5">Phone *</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
                    placeholder="+92 300 1234567" autoComplete="tel"
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="serviceId" className="block text-sm font-medium text-gray-200 mb-1.5">Service Needed</label>
                  <select id="serviceId" name="serviceId" value={formData.serviceId} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option value="" className="bg-gray-900">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id} className="bg-gray-900">{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="projectScope" className="block text-sm font-medium text-gray-200 mb-1.5">Project Description *</label>
                <textarea id="projectScope" name="projectScope" value={formData.projectScope} onChange={handleChange} required
                  placeholder="Tell us about your project — type of work, materials, dimensions, quantity, etc."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-200 mb-1.5">Preferred Timeline</label>
                  <input type="text" id="timeline" name="timeline" value={formData.timeline} onChange={handleChange}
                    placeholder="e.g., Within 2 weeks" autoComplete="off"
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-1.5">Location</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange}
                    placeholder="City / Area" autoComplete="address-level2"
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-200 mb-1.5">Budget Range</label>
                  <input type="text" id="budget" name="budget" value={formData.budget} onChange={handleChange}
                    placeholder="e.g., 50,000 - 100,000 PKR" autoComplete="off"
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                {submitting ? "Submitting..." : "Submit Quote Request"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

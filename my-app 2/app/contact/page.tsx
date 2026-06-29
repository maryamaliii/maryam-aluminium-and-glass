"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { MdPhone, MdEmail, MdLocationOn, MdSchedule, MdWhatsapp } from "react-icons/md";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email address";
    if (!formData.phone.trim()) errs.phone = "Phone is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setErrorMsg(data.error || "Failed to send message");
        setFormStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.span variants={itemVariants} className="inline-block px-4 py-1.5 bg-blue-600/10 border border-blue-600/30 rounded-full text-blue-500 text-xs font-semibold uppercase tracking-wider mb-6">
              Get in Touch
            </motion.span>
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Contact <span className="text-blue-500">Us</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have questions about our aluminium and glass services? Reach out for a free consultation and quote.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <p className="text-gray-400 mb-8">
                  We&apos;re here to answer any questions about our aluminium fabrication and glass solutions.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <MdPhone className="text-blue-500" size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Phone</h3>
                    <a href="tel:+923233541250" className="text-gray-400 hover:text-blue-500 transition">
                      +92 323 3541250
                    </a>
                    <p className="text-gray-500 text-sm">Call us for inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <MdWhatsapp className="text-blue-500" size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">WhatsApp</h3>
                    <a href="https://wa.me/923233541250" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
                      +92 323 3541250
                    </a>
                    <p className="text-gray-500 text-sm">Available: 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <MdEmail className="text-blue-500" size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Email</h3>
                    <a href="mailto:harisanwarali@gmail.com" className="text-gray-400 hover:text-blue-500 transition">
                      harisanwarali@gmail.com
                    </a>
                    <p className="text-gray-500 text-sm">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <MdLocationOn className="text-blue-500" size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Office Address</h3>
                    <p className="text-gray-400">Pakistan</p>
                    <p className="text-gray-500 text-sm">Serving residential and commercial clients nationwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <MdSchedule className="text-blue-500" size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Working Hours</h3>
                    <p className="text-gray-400">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-500 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <h3 className="text-base font-semibold text-white mb-4">Follow Us</h3>
                <a
                  href="https://wa.me/923233541250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-blue-600/20 border border-gray-700 rounded-lg text-gray-300 hover:text-blue-500 transition-all"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.485 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.38z" />
                  </svg>
                  WhatsApp
                </a>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

                {formStatus === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 mb-6">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                      <input
                        type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-700 border ${errors.name ? "border-red-500" : "border-gray-600"} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                      <input
                        type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-700 border ${errors.email ? "border-red-500" : "border-gray-600"} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                      <input
                        type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-700 border ${errors.phone ? "border-red-500" : "border-gray-600"} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                      <textarea
                        id="message" name="message" value={formData.message} onChange={handleChange} rows={5}
                        className={`w-full px-4 py-3 bg-gray-700 border ${errors.message ? "border-red-500" : "border-gray-600"} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none`}
                        placeholder="Tell us about your project or inquiry..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 shadow-lg shadow-blue-600/25"
                    >
                      {formStatus === "submitting" ? "Sending..." : "Send Message"}
                    </button>

                    {formStatus === "error" && (
                      <p className="text-center text-red-400">{errorMsg || "There was an error sending your message."}</p>
                    )}
                  </form>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

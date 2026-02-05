"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const formContainerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const inputFieldVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const buttonVariants: Variants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/mlgbavkz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormStatus("success");
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Black overlay with 30% opacity */}
      <div className="fixed inset-0 bg-black/30 pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Get in <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">Touch</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-200 max-w-2xl mx-auto"
              >
                Have questions about our aluminium and glass services? Reach out to our team for a personalized consultation and quote.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                  <p className="text-gray-200 mb-8">
                    We're here to answer any questions about our aluminium fabrication and glass solutions.
                    Our team is available to discuss your project requirements and provide expert guidance.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-blue-600 rounded-lg p-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Phone</h3>
                      <a href="https://wa.me/923233541250" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                        +92 323 3541250
                      </a>
                      <p className="text-gray-400 text-sm">Available: 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-blue-600 rounded-lg p-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Email</h3>
                      <a href="mailto:harisanwarali@gmail.com" className="text-gray-300 hover:text-white transition">
                        harisanwarali@gmail.com
                      </a>
                      <p className="text-gray-400 text-sm">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-blue-600 rounded-lg p-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Location</h3>
                      <p className="text-gray-300">Pakistan</p>
                      <p className="text-gray-400 text-sm">Serving residential and commercial clients</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://wa.me/923233541250"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 transition-colors duration-300 rounded-full p-3 inline-flex items-center justify-center"
                      aria-label="Contact us on WhatsApp"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.485 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.38z" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={formContainerVariants}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>

                {formStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-300 mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <motion.div variants={inputFieldVariants}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/10 border ${
                          errors.name ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                      )}
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={inputFieldVariants}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/10 border ${
                          errors.email ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div variants={inputFieldVariants}>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/10 border ${
                          errors.phone ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                      )}
                    </motion.div>

                    {/* Message Field */}
                    <motion.div variants={inputFieldVariants}>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 bg-white/10 border ${
                          errors.message ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
                        placeholder="Tell us about your project or inquiry..."
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                      )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className={`w-full px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                        formStatus === "submitting"
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {formStatus === "submitting" ? "Sending..." : "Send Message"}
                    </motion.button>

                    {formStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <p className="text-red-400">
                          There was an error sending your message. Please try again or contact us directly.
                        </p>
                      </motion.div>
                    )}
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
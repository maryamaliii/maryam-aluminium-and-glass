"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdStar, MdFormatQuote } from "react-icons/md";
import type { TestimonialResponse } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
}

export default function TestimonialsSection({
  title = "What Our Clients Say",
  subtitle = "Real feedback from our valued customers",
}: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<TestimonialResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTestimonials(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </motion.h2>
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-700 mx-auto mb-6" />
          <motion.p variants={itemVariants} className="text-lg text-gray-200 max-w-2xl mx-auto">
            {subtitle}
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 hover:bg-white/15"
              >
                <MdFormatQuote className="text-blue-400 text-2xl sm:text-3xl mb-3 sm:mb-4 opacity-50" />
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 line-clamp-4">
                  {t.content}
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <MdStar key={i} className="text-yellow-400" size={16} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {t.avatar && (
                    <Image
                      src={t.avatar}
                      alt={t.clientName}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-white font-semibold text-sm">{t.clientName}</p>
                    {(t.role || t.company) && (
                      <p className="text-gray-400 text-xs">
                        {[t.role, t.company].filter(Boolean).join(" / ")}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

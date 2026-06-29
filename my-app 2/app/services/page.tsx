"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ServiceCardWithSlider from "@/components/ServiceCardWithSlider";
import type { ServiceResponse } from "@/types";
import {
  MdOutlineCategory,
  MdCall,
  MdArrowForward,
} from "react-icons/md";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const sliderServices = [
  {
    title: "Mirror Installations",
    description:
      "Premium mirrors cut to any shape or size with polished, bevelled, or frosted edges for bathrooms, gyms, and commercial interiors.",
    images: ["/mirror1.jpg", "/mirror2.jpg", "/mirror3.jpg"],
  },
  {
    title: "Kitchen Glass & Aluminium",
    description:
      "Heat-resistant glass splashbacks, aluminium cabinet doors, and integrated lighting solutions for modern kitchens.",
    images: ["/kitchen1.jpg", "/kitchen2.jpg", "/kitchen3.jpg"],
  },
  {
    title: "Wardrobe Systems",
    description:
      "Sliding wardrobe doors with mirrored, tinted, or laminated panels featuring soft-close mechanisms and custom storage.",
    images: ["/wardrobe1.jpg", "/wardrobe2.jpg", "/wardrobe3.jpg"],
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setServices(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full bg-gray-900 min-h-screen">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Our <span className="text-blue-600">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              From custom mirrors to full-scale aluminium fabrication — we deliver
              precision craftsmanship for every project.
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14 sm:mb-18"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              What We Offer
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg"
            >
              Comprehensive aluminium and glass solutions for residential,
              commercial, and industrial clients.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {services.map((s) => {
                const firstImage = s.images?.[0];
                return (
                  <motion.article
                    key={s.id}
                    variants={fadeUp}
                    className="group bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-2xl overflow-hidden hover:border-blue-600/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/5"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {firstImage ? (
                        <Image
                          src={firstImage.url}
                          alt={firstImage.alt || s.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                          <MdOutlineCategory className="text-gray-500" size={40} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-500 transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {s.description}
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-blue-500 font-medium text-sm hover:text-blue-400 transition-colors"
                      >
                        View Details <MdArrowForward size={14} />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </section>

        {/* Service Cards with Slider */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-800/40">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="text-center mb-14 sm:mb-18"
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                Featured Work
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg"
              >
                Browse through some of our recent projects and installations.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {sliderServices.map((svc, idx) => (
                <motion.div key={idx} variants={fadeUp}>
                  <ServiceCardWithSlider
                    title={svc.title}
                    description={svc.description}
                    icon={MdOutlineCategory}
                    images={svc.images}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-3xl p-8 sm:p-12 lg:p-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Ready to Start Your Project?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto"
            >
              Get in touch for a free consultation and quote. No obligation, just
              expert advice tailored to your needs.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="tel:+923233541250"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors duration-300 shadow-lg shadow-blue-600/25"
            >
              <MdCall className="text-2xl" />
              Get a Free Quote
            </motion.a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

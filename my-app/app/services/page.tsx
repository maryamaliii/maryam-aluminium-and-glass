"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ServiceCardWithSlider from "@/components/ServiceCardWithSlider";
import { usePageMetadata } from "@/lib/use-page-metadata";
import {
  MdBuild,
  MdPalette,
  MdConstruction,
  MdHandshake,
  MdRoom,
  MdDesignServices,
  MdWindow,
  MdMeetingRoom,
  MdKitchen,
} from "react-icons/md";
import type { ServiceResponse } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  MdBuild,
  MdPalette,
  MdConstruction,
  MdHandshake,
  MdRoom,
  MdDesignServices,
  MdWindow,
  MdMeetingRoom,
  MdKitchen,
};

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServicesPage() {
  usePageMetadata(
    "Services",
    "Comprehensive aluminium and glass services — windows, doors, mirrors, wardrobes, kitchen glass, partitions, custom fabrication, and installation."
  )
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setServices(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="w-full"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Header />

        <main className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="text-center mb-16 sm:mb-20"
          >
            <motion.h1
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
            >
              Our <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">Services</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="text-base sm:text-lg text-white/80 max-w-2xl sm:max-w-3xl mx-auto px-2"
            >
              Comprehensive aluminium and glass solutions crafted with precision,
              experience, and modern design standards.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={container}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {services.map((service) => {
                const Icon = iconMap[service.icon] || MdBuild;
                return (
                  <ServiceCardWithSlider
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    icon={Icon}
                    images={service.images.map((img) => img.url)}
                  />
                );
              })}
            </motion.div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

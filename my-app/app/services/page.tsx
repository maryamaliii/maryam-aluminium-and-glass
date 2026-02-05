"use client";

import { motion, type Variants } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ServiceCardWithSlider from "@/components/ServiceCardWithSlider";
import {
  MdBuild,
  MdConstruction,
  MdPalette,
  MdHandshake,
  MdAccessTime,
  MdVerified,
  MdHome,
  MdRoom,
  MdDoorFront,
  MdWorkspaces,
  MdDesignServices,
  MdStorefront,
  MdWindow,
  MdMeetingRoom,
  MdKitchen,
} from "react-icons/md";

/* ---------------- Animations ---------------- */

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

/* ---------------- Services Data ---------------- */

const services = [
  {
    title: "Aluminium & Glass Mirrors",
    icon: MdPalette,
    images: [
      "/images/services/mirrors/mirror1.jpg",
      "/images/services/mirrors/mirror2.jpg",
      "/images/services/mirrors/mirror3.jpg",
      "/images/services/mirrors/mirror4.jpg",
      "/images/services/mirrors/mirror5.jpg",
      "/images/services/mirrors/mirror6.jpg",
      "/images/services/mirrors/mirror7.jpg",
      "/images/services/mirrors/mirror8.jpg",
      "/images/services/mirrors/mirror9.jpg",
      "/images/services/mirrors/mirror10.jpg",
    ],
    description:
      "Custom decorative, wall, bathroom, and full-length mirrors crafted to enhance your space with elegance and functionality.",
  },
  {
    title: "Aluminium & Glass Kitchen Solutions",
    icon: MdKitchen,
    images: [
      "/images/services/kitchen/kitchen1.jpg",
      "/images/services/kitchen/kitchen2.jpg",
      "/images/services/kitchen/kitchen3.jpg",
      "/images/services/kitchen/kitchen4.jpg",
      "/images/services/kitchen/kitchen5.jpg",
      "/images/services/kitchen/kitchen6.jpg",
      "/images/services/kitchen/kitchen7.jpg",
      "/images/services/kitchen/kitchen8.jpg",
      "/images/services/kitchen/kitchen9.jpg",
      "/images/services/kitchen/kitchen10.jpg",
    ],
    description:
      "Premium cabinets, shelves, backsplashes, breakfast bars, and countertops designed to optimize your kitchen space and functionality.",
  },
  {
    title: "Aluminium & Glass Wardrobes",
    icon: MdRoom,
    images: [
      "/images/services/wardrobes/wardrobe1.jpg",
      "/images/services/wardrobes/wardrobe2.jpg",
      "/images/services/wardrobes/wardrobe3.jpg",
      "/images/services/wardrobes/wardrobe4.jpg",
      "/images/services/wardrobes/wardrobe5.jpg",
      "/images/services/wardrobes/wardrobe6.jpg",
      "/images/services/wardrobes/wardrobe7.jpg",
      "/images/services/wardrobes/wardrobe8.jpg",
      "/images/services/wardrobes/wardrobe9.jpg",
      "/images/services/wardrobes/wardrobe10.jpg",
    ],
    description:
      "Modern sliding wardrobes, built-in storage solutions, and custom closets designed for maximum organization and aesthetic appeal.",
  },
  {
    title: "Custom Aluminium & Glass Fabrication",
    icon: MdDesignServices,
    images: [
      "/images/services/custom/custom1.jpg",
      "/images/services/custom/custom2.jpg",
      "/images/services/custom/custom3.jpg",
      "/images/services/custom/custom4.jpg",
      "/images/services/custom/custom5.jpg",
      "/images/services/custom/custom6.jpg",
      "/images/services/custom/custom7.jpg",
      "/images/services/custom/custom8.jpg",
      "/images/services/custom/custom9.jpg",
      "/images/services/custom/custom10.jpg",
    ],
    description:
      "Bespoke solutions tailored to your specific design requirements, bringing your unique vision to life with precision craftsmanship.",
  },
  {
    title: "Aluminium Windows & Doors",
    icon: MdWindow,
    images: [
      "/images/services/windows/windows1.jpg",
      "/images/services/windows/windows2.jpg",
      "/images/services/windows/windows3.jpg",
      "/images/services/windows/windows4.jpg",
      "/images/services/windows/windows5.jpg",
      "/images/services/windows/windows6.jpg",
      "/images/services/windows/windows7.jpg",
      "/images/services/windows/windows8.jpg",
      "/images/services/windows/windows9.jpg",
      "/images/services/windows/windows10.jpg",
    ],
    description:
      "All sizes and styles featuring ergonomic design and energy-efficient features for superior comfort and performance.",
  },
  {
    title: "Glass Doors & Office/Room Partitions",
    icon: MdMeetingRoom,
    images: [
      "/images/services/partitions/partition1.jpg",
      "/images/services/partitions/partition2.jpg",
      "/images/services/partitions/partition3.jpg",
      "/images/services/partitions/partition4.jpg",
      "/images/services/partitions/partition5.jpg",
      "/images/services/partitions/partition6.jpg",
      "/images/services/partitions/partition7.jpg",
      "/images/services/partitions/partition8.jpg",
      "/images/services/partitions/partition9.jpg",
      "/images/services/partitions/partition10.jpg",
    ],
    description:
      "Frameless glass walls, elegant office dividers, and room partitions that create open, bright spaces while maintaining functionality.",
  },
  {
    title: "Interior Fixtures & Architectural Installations",
    icon: MdConstruction,
    images: [
      "/images/services/fixtures/fixture1.jpg",
      "/images/services/fixtures/fixture2.jpg",
      "/images/services/fixtures/fixture3.jpg",
      "/images/livingroom.jpg",
      "/images/staircase.jpg",
      "/images/services/fixtures/fixture6.jpg",
      "/images/storefront.jpg",
      "/images/services/fixtures/fixture8.jpg",
      "/images/services/fixtures/fixture9.jpg",
      "/images/services/fixtures/fixture10.jpg",
    ],
    description:
      "Professional stair rails, balustrades, ceiling features, and storefront installations that enhance architectural beauty and safety.",
  },
  {
    title: "Professional Installation & Consultation",
    icon: MdHandshake,
    images: [
      "/images/services/installation/installation1.jpg",
      "/images/services/installation/installation2.jpg",
      "/images/services/installation/installation3.jpg",
      "/images/services/installation/installation4.jpg",
      "/images/services/installation/installation5.jpg",
      "/images/services/installation/installation6.jpg",
      "/images/services/installation/installation7.jpg",
      "/images/services/installation/installation8.jpg",
      "/images/services/installation/installation9.jpg",
      "/images/services/installation/installation10.jpg",
    ],
    description:
      "Expert site consultation, precise measurement, and professional installation services ensuring perfect results every time.",
  },
];

/* ---------------- Page ---------------- */

export default function ServicesPage() {
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
      {/* dark overlay */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Header />

        <main className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="text-center mb-16 sm:mb-20"
          >
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6"
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

          {/* Services Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {services.map((service, i) => {
              return (
                <ServiceCardWithSlider
                  key={i}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  images={service.images}
                />
              );
            })}
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

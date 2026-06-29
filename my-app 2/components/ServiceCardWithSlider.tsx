"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  images: string[];
}

const ServiceCardWithSlider = ({ title, description, icon: Icon, images }: ServiceCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, images.length]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToPrev = () => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  const goToNext = () => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);

  return (
    <motion.div
      className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-600/30 transition-all duration-500 h-full flex flex-col shadow-lg hover:shadow-2xl hover:shadow-blue-600/5"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Slider */}
      <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[320px] overflow-hidden bg-gray-900">
        {images.length > 0 && (
          <>
            {images.map((imgSrc, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 ${index === currentIndex ? "z-10" : "z-0"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt=""
                      fill
                      className="object-cover blur-2xl scale-110 opacity-60"
                      aria-hidden="true"
                      priority={index === 0}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0">
                    <Image
                      src={imgSrc}
                      alt={`${title} - Image ${index + 1}`}
                      fill
                      className="object-contain"
                      priority={index === 0}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-blue-600/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  aria-label="Previous image"
                >
                  <MdChevronLeft size={20} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-blue-600/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  aria-label="Next image"
                >
                  <MdChevronRight size={20} />
                </button>
              </>
            )}
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-600 w-4" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
            <Icon className="text-blue-500" size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCardWithSlider;

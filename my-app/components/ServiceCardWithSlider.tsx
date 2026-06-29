'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images.length]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToPrev = () => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  const goToNext = () => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);

  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all(
        images.map(async (src) => {
          return new Promise((resolve, reject) => {
            const img = new window.Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          });
        })
      );
    };
    if (images.length > 0) {
      preloadImages();
    }
  }, [images]);

  return (
    <motion.div
      className="group bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col shadow-lg hover:shadow-2xl hover:shadow-blue-500/5"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[200px] sm:h-[260px] lg:h-[340px] overflow-hidden bg-black">
        {images.length > 0 && (
          <>
            {images.map((imgSrc, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 flex items-center justify-center ${index === currentIndex ? 'z-10' : 'z-0'}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  scale: index === currentIndex ? 1 : 1.05
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={imgSrc}
                    alt={`${title} — Meer Engineering service image ${index + 1}`}
                    fill
                    className="object-cover"
                    loading={index === 0 ? undefined : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>
              </motion.div>
            ))}

            {images.length > 1 && (
              <>
                <motion.button
                  onClick={goToPrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-2.5 sm:p-3 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg"
                  aria-label="Previous image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiChevronLeft size={20} className="drop-shadow-lg" />
                </motion.button>
                <motion.button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-2.5 sm:p-3 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg"
                  aria-label="Next image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiChevronRight size={20} className="drop-shadow-lg" />
                </motion.button>
              </>
            )}
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-1.5 sm:space-x-2 bg-black/40 backdrop-blur-md px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 shadow-lg">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="transition-all duration-300"
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {index === currentIndex ? (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-3 h-3 bg-white rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                ) : (
                  <div className="w-2 h-2 bg-white/50 rounded-full" />
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <div className="flex items-start gap-3 mb-3 sm:mb-4">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon className="text-2xl sm:text-4xl text-blue-400" />
          </motion.div>
          <motion.h3
            className="text-lg sm:text-xl font-bold text-white leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {title}
          </motion.h3>
        </div>
        <motion.p
          className="text-gray-300 text-sm sm:text-base leading-relaxed flex-grow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ServiceCardWithSlider;

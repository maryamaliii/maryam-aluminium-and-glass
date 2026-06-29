'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaCircle, FaRegCircle } from 'react-icons/fa';

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

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Increased interval for more premium feel
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Preload images to avoid flickering
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
      className="group bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 h-full flex flex-col shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
        scale: {
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1]
        }
      }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Slider Section */}
      <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[340px] overflow-hidden bg-black">
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
                transition={{
                  duration: 0.7,
                  ease: [0.23, 1, 0.32, 1],
                  scale: {
                    duration: 0.5,
                    ease: [0.23, 1, 0.32, 1]
                  }
                }}
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={imgSrc}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={95}
                    onLoadingComplete={(img) => {
                      if (index === 0) {
                        img.style.transform = 'scale(1)';
                        img.style.transition = 'transform 0.3s ease';
                      }
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <motion.button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:scale-105"
                  aria-label="Previous image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiChevronLeft size={24} className="drop-shadow-lg" />
                </motion.button>
                <motion.button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:scale-105"
                  aria-label="Next image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiChevronRight size={24} className="drop-shadow-lg" />
                </motion.button>
              </>
            )}
          </>
        )}

        {/* Slide Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2 bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 shadow-lg">
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

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col bg-gradient-to-b from-transparent to-white/5">
        <div className="flex items-start space-x-4 mb-4">
          <motion.div
            className="flex-shrink-0 min-w-fit"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon className="text-4xl text-blue-300 drop-shadow-lg" />
          </motion.div>
          <motion.h3
            className="text-xl font-bold text-white leading-tight tracking-wide"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {title}
          </motion.h3>
        </div>
        <motion.p
          className="text-white/80 text-base leading-relaxed flex-grow"
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // ✅ Fetch from your backend API
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/getNewArrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) =>
      newArrivals.length > 0 ? (prev + 1) % newArrivals.length : 0
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) =>
      newArrivals.length > 0
        ? prev === 0
          ? newArrivals.length - 1
          : prev - 1
        : 0
    );
  };

  if (newArrivals.length === 0) {
    return (
      <section className="py-24 bg-[#0b0b0b] text-white text-center">
        <p className="text-gray-400 text-lg">Loading new arrivals...</p>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-[#0b0b0b] text-white overflow-hidden">
      {/* Subtle background accent */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d6a354]/5 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Header */}
      <div className="container mx-auto text-center mb-16 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.2em] uppercase text-[#b3b3b3] mb-4"
        >
          Latest Drops
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          New <span className="text-[#d6a354]">Arrivals</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[#b3b3b3] max-w-2xl mx-auto text-base"
        >
          Fresh drops. Curated styles. Exclusive pieces.
        </motion.p>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-[#141414] hover:bg-[#1e1e1e] border border-[#2a2a2a] transition z-20 group"
      >
        <ChevronLeft className="text-xl text-[#b3b3b3] group-hover:text-[#d6a354] transition" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-[#141414] hover:bg-[#1e1e1e] border border-[#2a2a2a] transition z-20 group"
      >
        <ChevronRight className="text-xl text-[#b3b3b3] group-hover:text-[#d6a354] transition" />
      </button>

      {/* 3D Carousel */}
      <div
        className="relative w-full h-[500px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {newArrivals.map((product, i) => {
          const total = newArrivals.length;
          const offset = (i - activeIndex + total) % total;
          const middle = Math.floor(total / 2);
          const relative = offset > middle ? offset - total : offset;

          const isMobile =
            typeof window !== "undefined" && window.innerWidth < 640;
          const angle = relative * (isMobile ? 15 : 25);
          const translateX = relative * (isMobile ? 180 : 300);
          const translateZ = -Math.abs(relative) * (isMobile ? 100 : 250);
          const scale = 1 - Math.abs(relative) * 0.15;
          const opacity = relative === 0 ? 1 : 0.4;
          const zIndex = 100 - Math.abs(relative) * 10;

          return (
            <motion.div
              key={product._id}
              className="absolute w-56 sm:w-72 h-[380px] sm:h-[450px] rounded-sm overflow-hidden border border-[#2a2a2a]"
              style={{
                transform: `
                  translateX(${translateX}px)
                  translateZ(${translateZ}px)
                  rotateY(${angle}deg)
                  scale(${scale})
                `,
                opacity,
                zIndex,
                transition: "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
                transformOrigin: "center center",
                backgroundColor: "#141414",
              }}
            >
              <div className="relative group w-full h-full">
                <div className="w-full h-3/4 overflow-hidden">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    draggable="false"
                  />
                </div>

                {/* NEW Badge - only on center item */}
                {relative === 0 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="absolute top-4 right-4 bg-[#d6a354] text-[#0b0b0b] text-xs font-bold px-3 py-1 rounded-sm"
                  >
                    NEW
                  </motion.div>
                )}

                {/* Product Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#141414] to-transparent">
                  <h3 className="text-base font-semibold text-[#f5f5f5] mb-1 truncate">
                    {product.name.slice(0, -2)}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#d6a354] font-semibold">
                      ${product.price}
                    </p>
                    {relative === 0 && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Link
                          to={`/product/${product._id}`}
                          className="text-[#b3b3b3] hover:text-[#d6a354] transition"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Hover overlay for center item */}
                {relative === 0 && (
                  <motion.div
                    className="absolute inset-0 border-2 border-[#d6a354] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {newArrivals.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1);
              setActiveIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-[#d6a354] w-8"
                : "bg-[#2a2a2a] hover:bg-[#d6a354]/50"
            }`}
          />
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-16 px-4"
      >
        <Link
          to="/collections/all?sort=new"
          className="group inline-flex items-center gap-2 bg-[#d6a354] text-[#0b0b0b] font-semibold text-sm px-8 py-3 rounded-sm transition-all duration-300"
        >
          View All Arrivals
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </section>
  );
};

export default NewArrivals;

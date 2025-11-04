import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll-based parallax effects
  const yText = useTransform(scrollY, [0, 300], [0, 80]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center text-center overflow-hidden h-[100vh] bg-[#0b0b0b] text-white"
    >
      {/* Subtle spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(214, 163, 84, 0.08), transparent 60%)`,
        }}
      />

      {/* Minimal background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0b0b] to-[#141414]" />

      {/* Single subtle accent orb */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#d6a354]/5 rounded-full blur-[120px]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 flex flex-col items-center justify-center max-w-5xl px-4"
      >
        {/* Small badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-xs tracking-[0.2em] uppercase text-[#b3b3b3] font-medium"
        >
          Premium Fashion
        </motion.div>

        {/* Main title - clean and bold */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-[#f5f5f5]">Drip</span>
          <span className="text-[#d6a354]">Nest</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-[#b3b3b3] max-w-xl mb-12 leading-relaxed"
        >
          Curated collections for those who refuse to blend in
        </motion.p>

        {/* CTA Button - minimal and elegant */}
        <Link to="/collections/all">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative bg-[#d6a354] text-[#0b0b0b] font-semibold text-base px-10 py-4 rounded-sm overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-3">
            Explore Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </motion.button>
        </Link>

        {/* Minimal stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex gap-12 mt-20 text-sm"
        >
          <div className="text-center">
            <div className="text-2xl font-semibold text-[#f5f5f5] mb-1">10K+</div>
            <div className="text-xs text-[#b3b3b3] uppercase tracking-wider">Products</div>
          </div>
          <div className="w-px bg-[#2a2a2a]" />
          <div className="text-center">
            <div className="text-2xl font-semibold text-[#f5f5f5] mb-1">50K+</div>
            <div className="text-xs text-[#b3b3b3] uppercase tracking-wider">Customers</div>
          </div>
          <div className="w-px bg-[#2a2a2a]" />
          <div className="text-center">
            <div className="text-2xl font-semibold text-[#f5f5f5] mb-1">4.9</div>
            <div className="text-xs text-[#b3b3b3] uppercase tracking-wider">Rating</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#d6a354] to-transparent"
        />
        <span className="text-[10px] text-[#b3b3b3] uppercase tracking-[0.2em]">Scroll</span>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0b0b0b] pointer-events-none" />
    </section>
  );
};

export default Hero;
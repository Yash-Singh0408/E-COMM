import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const collections = [
    {
      title: "Women's",
      subtitle: "Collection",
      description: "Elegant designs that celebrate femininity",
      link: "/collections/all?gender=Women",
      y: y1,
      icons: [
        { Icon: Sparkles, position: "top-20 left-20", size: "w-10 h-10", delay: 0 },
        { Icon: Heart, position: "top-40 right-24", size: "w-8 h-8", delay: 0.2 },
        { Icon: Star, position: "bottom-32 left-28", size: "w-7 h-7", delay: 0.4 },
      ],
      pattern: (
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="women-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#d6a354" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#women-pattern)" />
        </svg>
      ),
    },
    {
      title: "Men's",
      subtitle: "Collection",
      description: "Bold styles for the modern gentleman",
      link: "/collections/all?gender=Men",
      y: y2,
      icons: [
        { Icon: Zap, position: "top-24 right-20", size: "w-10 h-10", delay: 0 },
        { Icon: Star, position: "top-44 left-24", size: "w-8 h-8", delay: 0.2 },
        { Icon: Sparkles, position: "bottom-28 right-32", size: "w-7 h-7", delay: 0.4 },
      ],
      pattern: (
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="men-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="18" y="18" width="4" height="4" fill="#d6a354" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#men-pattern)" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-[#0b0b0b] text-white overflow-hidden"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 mb-16 text-center"
      >
        <p className="text-xs tracking-[0.2em] uppercase text-[#b3b3b3] mb-4">Discover</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#f5f5f5]">
          Shop by <span className="text-[#d6a354]">Category</span>
        </h2>
      </motion.div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
        {collections.map((item, index) => (
          <CollectionCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

const CollectionCard = ({ item, index }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      style={{ y: item.y }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-sm group h-[600px] bg-[#141414] border border-[#2a2a2a] hover:border-[#d6a354]/50 transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Mouse spotlight effect - more subtle */}
      {isHovering && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(214, 163, 84, 0.08), transparent 40%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Pattern Background - more subtle */}
      {item.pattern}

      {/* Gradient Orb - smaller and more subtle */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px]"
        style={{ backgroundColor: '#d6a35410' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Icons - more subtle */}
      {item.icons.map((iconItem, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${iconItem.position} hidden md:block opacity-30`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: iconItem.delay, duration: 0.5 }}
          viewport={{ once: true }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3 + idx,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <iconItem.Icon 
            className={`${iconItem.size} text-[#d6a354]`}
            strokeWidth={1.5}
          />
        </motion.div>
      ))}

      {/* Large Central SVG Icon - more subtle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <svg
          width="280"
          height="280"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* T-shirt icon */}
          <path
            d="M60 60 L60 40 L80 30 L100 40 L120 30 L140 40 L140 60 L130 70 L130 160 L70 160 L70 70 Z M80 30 L80 50 M120 30 L120 50"
            stroke="#d6a354"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-10 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-[#b3b3b3] mb-2">
            {item.subtitle}
          </p>
          <h3 className="text-4xl sm:text-5xl font-bold text-[#f5f5f5] mb-3">
            {item.title}
          </h3>
          <p className="text-sm text-[#b3b3b3] mb-6 max-w-xs">
            {item.description}
          </p>

<Link to={item.link} >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 bg-[#d6a354] text-[#0b0b0b] font-semibold text-sm px-6 py-3 rounded-sm transition-all duration-300"
          >
          Explore Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Top border accent - thinner */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-[#d6a354]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

export default GenderCollectionSection;
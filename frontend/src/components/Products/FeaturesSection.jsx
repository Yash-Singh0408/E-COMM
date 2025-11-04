import React, { useState } from "react";
import { ShoppingBag, Shield, Gift, Clock, Globe } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Free International Shipping",
    desc: "Enjoy free shipping on all orders over $100 worldwide.",
    icon: <Globe className="w-12 h-12 text-[#d6a354]" />,
    colSpan: "md:col-span-2 lg:col-span-2",
    rowSpan: "md:row-span-1",
  },
  {
    id: 2,
    title: "Secure Payments",
    desc: "All transactions are encrypted & protected with industry-leading security.",
    icon: <Shield className="w-12 h-12 text-[#d6a354]" />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
  },
  {
    id: 3,
    title: "24/7 Support",
    desc: "Our team is here to help anytime, day or night.",
    icon: <Clock className="w-10 h-10 text-[#d6a354]" />,
    colSpan: "md:col-span-1",
  },
  {
    id: 4,
    title: "Exclusive Offers",
    desc: "Sign up for early access to limited collections and member-only deals.",
    icon: <Gift className="w-10 h-10 text-[#d6a354]" />,
    colSpan: "md:col-span-1",
  },
  {
    id: 5,
    title: "Quality Guaranteed",
    desc: "Every product is quality-checked before shipping. Love it or return it within 30 days.",
    icon: <ShoppingBag className="w-12 h-12 text-[#d6a354]" />,
    colSpan: "md:col-span-2 lg:col-span-2",
    rowSpan: "md:row-span-1",
  },
  {
    id: 6,
    title: "Express Delivery",
    desc: "Next-day delivery available in major cities.",
    icon: <Clock className="w-10 h-10 text-[#d6a354]" />,
    colSpan: "md:col-span-1",
  },
];

const FeatureCard = ({ feature, index }) => {
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
      className={`group relative rounded-sm p-8 bg-[#141414] border border-[#2a2a2a] hover:border-[#d6a354]/50 transition-all duration-500 flex flex-col justify-between overflow-hidden ${feature.colSpan || ""} ${feature.rowSpan || ""}`}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Border Light */}
      <div className="absolute inset-0 rounded-sm overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, rgba(214, 163, 84, 0.6) 50%, transparent 60%, transparent 100%)`,
          }}
        />
        <div className="absolute inset-[2px] rounded-sm bg-[#141414]" />
      </div>

      {/* Spotlight Effect Following Mouse */}
      {isHovering && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(214, 163, 84, 0.15), transparent 40%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        <motion.div 
          className="mb-4" 
        >
          {feature.icon}
        </motion.div>
        <div className="flex-grow">
          <h4 className="text-xl lg:text-2xl font-bold mb-3 text-[#f5f5f5]">
            {feature.title}
          </h4>
          <p className="text-[#b3b3b3] text-sm lg:text-base leading-relaxed">
            {feature.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section className="py-24 bg-[#0b0b0b] text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ y, opacity }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-[#b3b3b3] mb-4">
            Our Promise
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight text-[#f5f5f5]">
            Why Shop With <span className="text-[#d6a354]">Us</span>
          </h2>
          <p className="text-[#b3b3b3] text-lg max-w-2xl mx-auto">
            Elevating your shopping experience — every step of the way
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 lg:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
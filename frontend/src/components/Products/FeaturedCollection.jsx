import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Shirt, Package, Zap, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedCollection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  const navigate =useNavigate();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Floating icons data - all gold colored
  const floatingIcons = [
    { Icon: Shirt, delay: 0, size: 'w-16 h-16', position: 'top-1/4 left-1/4' },
    { Icon: Package, delay: 0.5, size: 'w-12 h-12', position: 'top-1/2 left-1/3' },
    { Icon: Zap, delay: 1, size: 'w-14 h-14', position: 'top-1/3 right-1/4' },
    { Icon: Star, delay: 1.5, size: 'w-10 h-10', position: 'bottom-1/3 left-1/2' },
    { Icon: Sparkles, delay: 2, size: 'w-12 h-12', position: 'top-1/2 right-1/3' },
  ];

  return (
    <section className='py-16 px-4 lg:px-8 bg-[#0b0b0b]'>    
      <motion.div 
        className='container mx-auto relative'
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div 
          className='relative flex flex-col-reverse lg:flex-row items-center bg-[#141414] rounded-sm overflow-hidden border border-[#2a2a2a]'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Spotlight Effect */}
          {isHovering && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(214, 163, 84, 0.15), transparent 40%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}

          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-sm overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, transparent 45%, rgba(214, 163, 84, 0.4) 50%, transparent 55%, transparent 100%)`,
              }}
            />
          </div>

          {/* Left side - Content */}
          <motion.div 
            className='lg:w-1/2 p-8 lg:p-12 text-center lg:text-left flex flex-col justify-center relative z-20'
            style={{ y: textY }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className='inline-flex items-center gap-2 bg-[#d6a354]/10 border border-[#d6a354]/30 rounded-sm px-4 py-2 mb-4 w-fit self-center lg:self-start'
            >
              <Sparkles className="w-4 h-4 text-[#d6a354]" />
              <span className='text-sm font-semibold text-[#d6a354]'>
                New Collection
              </span>
            </motion.div>

            <motion.p 
              className='text-xs tracking-[0.2em] uppercase text-[#b3b3b3] mb-2'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Comfort Redefined
            </motion.p>

            <motion.h3 
              className='text-4xl lg:text-5xl font-bold mb-6 text-[#f5f5f5] leading-tight'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Apparel that Moves with You{' '}
              <span className='text-[#d6a354]'>
                Everyday
              </span>
            </motion.h3>

            <motion.p 
              className='text-base text-[#b3b3b3] mb-8 leading-relaxed'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Discover our latest collection of apparel designed for ultimate comfort and style. Whether you're at home, at work, or on the go, our pieces are crafted to keep you feeling great all day long.
            </motion.p>

            <motion.button
              className='group bg-[#d6a354] w-fit self-center lg:self-auto text-[#0b0b0b] px-8 py-4 rounded-sm text-base font-semibold'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => navigate('/collections/all')}
            >
              <span className='flex items-center gap-2'>
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            {/* Floating Stats */}
            <motion.div 
              className='flex gap-6 mt-8 justify-center lg:justify-start'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className='text-center lg:text-left'>
                <div className='text-2xl font-bold text-[#f5f5f5]'>50K+</div>
                <div className='text-sm text-[#b3b3b3]'>Happy Customers</div>
              </div>
              <div className='w-px bg-[#2a2a2a]' />
              <div className='text-center lg:text-left'>
                <div className='text-2xl font-bold text-[#f5f5f5]'>4.9★</div>
                <div className='text-sm text-[#b3b3b3]'>Average Rating</div>
              </div>
              <div className='w-px bg-[#2a2a2a]' />
              <div className='text-center lg:text-left'>
                <div className='text-2xl font-bold text-[#f5f5f5]'>200+</div>
                <div className='text-sm text-[#b3b3b3]'>New Arrivals</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Icon Scene */}
          <motion.div 
            className='lg:w-1/2 relative h-[400px] lg:h-[600px] overflow-hidden'
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Background Gradient Orb */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d6a354]/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Floating Icons */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className={`absolute ${item.position}`}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 0.4, scale: 1, rotate: 0 }}
                transition={{ delay: item.delay, duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 4 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <motion.div
                  className={`${item.size} text-[#d6a354] bg-[#0b0b0b]/80 backdrop-blur-md rounded-sm p-4 border border-[#2a2a2a]`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.Icon className="w-full h-full" strokeWidth={1.5} />
                </motion.div>
              </motion.div>
            ))}

            {/* Central Large Icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              viewport={{ once: true }}
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-[#d6a354]/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative bg-[#141414] backdrop-blur-xl rounded-sm p-12 border-2 border-[#d6a354]/50">
                  <Shirt className="w-32 h-32 text-[#d6a354]" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              className='absolute top-8 right-8 bg-[#d6a354] rounded-sm px-6 py-3'
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <div className='text-2xl font-bold text-[#0b0b0b]'>30% OFF</div>
              <div className='text-xs text-[#0b0b0b]/70'>Limited Time</div>
            </motion.div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full" style={{
                backgroundImage: `linear-gradient(rgba(214, 163, 84, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(214, 163, 84, 0.5) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedCollection;
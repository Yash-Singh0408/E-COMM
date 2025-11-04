import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants for scroll reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const ProductGrid = ({ products, loading, error }) => {
  if (loading)
    return <p className="text-[#b3b3b3] text-center">Loading...</p>;
  if (error)
    return <p className="text-red-400 text-center">Error: {error}</p>;

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {products.map((product, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{
            scale: 1.05,
            rotateX: 3,
            rotateY: -3,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.98 }}
          className="transform-gpu"
        >
          <Link
            to={`/product/${product._id}`}
            className="block rounded-sm overflow-hidden border border-[#2a2a2a] bg-[#141414] transition-all duration-500 hover:border-[#d6a354]/50"
          >
            {/* Product Image */}
            <div className="w-full h-64 sm:h-80 overflow-hidden bg-[#0b0b0b]">
              <motion.img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700"
                draggable="false"
                whileHover={{
                  scale: 1.07,
                  transition: { duration: 0.6, ease: "easeOut" },
                }}
              />
            </div>

            {/* Product Info */}
            <div className="px-4 py-5">
              <h3 className="text-[#f5f5f5] text-sm sm:text-base font-medium mb-1 truncate transition-colors duration-300 hover:text-[#d6a354]">
                {product.name}
              </h3>
              <p className="text-[#d6a354] font-semibold text-sm tracking-tight">
                ${product.price}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
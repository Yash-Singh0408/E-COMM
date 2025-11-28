import { motion } from "framer-motion";

const PremiumLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      {/* Outer Glow Circle */}
      <motion.div
        className="relative w-24 h-24 rounded-full flex items-center justify-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--color-accent), transparent 70%)",
          boxShadow: "0 0 30px var(--color-accent)",
        }}
      >
        {/* Inner Rotating Ring */}
        <motion.div
          className="absolute inset-0 border-[3px] border-[var(--color-accent)] rounded-full"
          style={{ boxShadow: "0 0 25px var(--color-accent)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        {/* Pulsing Center Dot */}
        <motion.div
          className="w-6 h-6 rounded-full bg-[var(--color-accent)]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>

      {/* Text Below */}
      <motion.p
        className="mt-8 text-lg tracking-wider font-light text-[var(--color-text-secondary)]"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading <span className="text-[var(--color-accent)]">Content</span>...
      </motion.p>
    </div>
  );
};

export default PremiumLoader;

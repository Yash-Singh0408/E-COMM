/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { TbBrandMeta } from "react-icons/tb";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing with email:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#0a0a0a] text-gray-300">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-white text-lg">Newsletter</h3>
            <p className="text-sm text-gray-400">
              Be the first to hear about new products and exclusive offers.
            </p>
            <p className="text-sm font-medium text-gray-200">
              Sign up and get 10% off your first order.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none text-sm"
                required
              />
              <button
                type="submit"
                className="bg-white text-black px-5 py-2 rounded font-semibold text-sm hover:bg-gray-200 transition"
              >
                Subscribe
              </button>
            </form>
          </motion.div>

          {/* Shop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-white text-lg">Shop</h3>
            <ul className="space-y-2">
              {[
                "Men's Top Wear",
                "Women's Top Wear",
                "Men's Bottom Wear",
                "Women's Bottom Wear",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-white text-lg">Support</h3>
            <ul className="space-y-2">
              {["Contact Us", "About Us", "FAQs", "Features"].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Follow Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-white text-lg">Follow Us</h3>
            <div className="flex space-x-3">
              {[
                { icon: <TbBrandMeta size={16} />, label: "Meta" },
                { icon: <FaInstagram size={16} />, label: "Instagram" },
                { icon: <FaTwitter size={16} />, label: "Twitter" },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={item.label}
                  className="w-9 h-9 bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-white/10 transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>
            <div className="space-y-2 mt-6">
              <p className="text-sm text-gray-400">Call Us</p>
              <a
                href="tel:0123-456-789"
                className="flex items-center text-gray-200 font-medium hover:text-white"
              >
                <FaPhoneAlt size={14} className="mr-2" />
                0123-456-789
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            © 2025 <span className="text-white font-medium">DripNest</span>. All
            Rights Reserved.
          </p>
        </div>
      </div>

      {/* Accent arrow */}
      <div className="absolute right-1/2 bottom-24 transform translate-x-1/2 hidden lg:block">
        <FiChevronRight size={22} className="text-gray-700 -rotate-45" />
      </div>
    </footer>
  );
};

export default Footer;

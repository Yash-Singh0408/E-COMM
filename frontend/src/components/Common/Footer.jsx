import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { TbBrandMeta } from "react-icons/tb";
import { FiChevronRight } from "react-icons/fi";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing with email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-100 relative ">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Newsletter</h3>
            <p className="text-sm text-gray-600">
              Be the first to hear about new products, exclusive events, and
              online offers.
            </p>
            <p className="text-sm text-gray-700 font-medium">
              Sign up and get 10% off your first order.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Shop Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Men's Top Wear
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Women's Top Wear
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Men's Bottom Wear
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Women's Bottom Wear
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
                aria-label="Meta"
              >
                <TbBrandMeta size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={16} />
              </a>
            </div>
            <div className="space-y-2 mt-6">
              <p className="text-sm text-gray-600">Call Us</p>
              <a
                href="tel:0123-456-789"
                className="flex items-center text-gray-800 font-medium"
              >
                <FaPhoneAlt size={14} className="mr-2" />
                0123-456-789
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © 2025 MyShop. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Arrow decoration */}
      <div className="absolute right-1/2 bottom-32 transform translate-x-1/2 hidden lg:block">
        <FiChevronRight size={20} className="text-gray-400 -rotate-45" />
      </div>
    </footer>
  );
};

export default Footer;

/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { FiLogIn } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  // 🔹 Dropdown data
  const categories = {
    Men: ["Top Wear", "Bottom Wear", "Outerwear", "Footwear", "Athleisure"],
    Women: ["Top Wear", "Bottom Wear", "Outerwear", "Accessories", "Athleisure"],
    Unisex: ["Outerwear", "Footwear", "Athleisure"],
  };

  const collections = [
    "Casual Street",
    "Winter Vibes",
    "Denim Collection",
    "Vacation Wear",
    "Activewear",
    "Urban Essentials",
    "Formal Fits",
  ];

  // 🔹 Handle dropdown toggle
  const handleDropdownToggle = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, pointerEvents: "none" },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 14 }}
        className="sticky top-0 z-50 bg-navbar backdrop-blur-xl border-b border-border"
      >
        <div
          ref={dropdownRef}
          className="container mx-auto flex items-center justify-between px-4 md:px-8 py-3"
        >
          {/* 🔸 Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/"
              onClick={() => setActiveDropdown(null)}
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-primary hover:text-accent transition"
            >
              DripNest
            </Link>
          </motion.div>

          {/* 🔸 Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 relative">
            {Object.keys(categories).map((gender) => (
              <div key={gender} className="relative">
                <button
                  onClick={() => handleDropdownToggle(gender)}
                  className="flex items-center gap-1 text-text-secondary text-sm font-semibold uppercase tracking-wide hover:text-accent transition"
                >
                  {gender}
                  {activeDropdown === gender ? (
                    <IoChevronUp className="w-4 h-4 transition-transform" />
                  ) : (
                    <IoChevronDown className="w-4 h-4 transition-transform" />
                  )}
                </button>

                <AnimatePresence>
                  {activeDropdown === gender && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute top-full left-0 mt-2 bg-bg border border-border shadow-xl rounded-md w-48 overflow-hidden z-50"
                    >
                      {categories[gender].map((cat) => (
                        <Link
                          key={cat}
                          to={`/collections/all?gender=${gender}&category=${cat}`}
                          onClick={() => setActiveDropdown(null)} // ✅ auto-close on click
                          className="block px-4 py-2 text-sm text-text-secondary hover:text-accent hover:bg-bg-highlight transition"
                        >
                          {cat}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* 🔹 Collections Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle("Collections")}
                className="flex items-center gap-1 text-text-secondary text-sm font-semibold uppercase tracking-wide hover:text-accent transition"
              >
                Collections
                {activeDropdown === "Collections" ? (
                  <IoChevronUp className="w-4 h-4 transition-transform" />
                ) : (
                  <IoChevronDown className="w-4 h-4 transition-transform" />
                )}
              </button>

              <AnimatePresence>
                {activeDropdown === "Collections" && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute top-full left-0 mt-2 bg-bg border border-border shadow-xl rounded-md w-56 overflow-hidden z-50"
                  >
                    {collections.map((col) => (
                      <Link
                        key={col}
                        to={`/collections/all?collection=${col}`}
                        onClick={() => setActiveDropdown(null)} // ✅ auto-close on click
                        className="block px-4 py-2 text-sm text-text-secondary hover:text-accent hover:bg-bg-highlight transition"
                      >
                        {col}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 🔸 Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-5">
            {user && user?.role === "admin" && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/admin"
                  onClick={() => setActiveDropdown(null)}
                  className="bg-accent text-black px-3 py-1 rounded-full text-xs md:text-sm font-medium hover:bg-accent/80 transition"
                >
                  Admin
                </Link>
              </motion.div>
            )}

            {user ? (
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/profile" onClick={() => setActiveDropdown(null)}>
                  <HiOutlineUser className="h-5 w-5 md:h-6 md:w-6 text-text-secondary hover:text-accent transition" />
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/login" onClick={() => setActiveDropdown(null)}>
                  <FiLogIn className="h-5 w-5 md:h-6 md:w-6 text-text-secondary hover:text-accent transition" />
                </Link>
              </motion.div>
            )}

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={toggleCartDrawer}
              className="relative"
            >
              <HiOutlineShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-text-secondary hover:text-accent transition" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-accent text-black text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-semibold"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>

            <SearchBar />

            <button onClick={toggleNavDrawer} className="lg:hidden">
              <HiBars3BottomRight className="h-6 w-6 text-text-secondary hover:text-accent transition" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 🔹 Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* 🔹 Mobile Drawer (same as before) */}
      <AnimatePresence>
        {navDrawerOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
              className="fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-bg shadow-xl border-r border-border z-50"
            >
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h2 className="text-xl font-semibold text-text-primary">Menu</h2>
                <button onClick={toggleNavDrawer}>
                  <IoMdClose className="h-6 w-6 text-text-secondary hover:text-accent transition" />
                </button>
              </div>

              <nav className="p-4 space-y-4">
                {Object.keys(categories).map((gender) => (
                  <div key={gender}>
                    <p className="text-text-primary font-semibold">{gender}</p>
                    <div className="ml-3 mt-1 space-y-1">
                      {categories[gender].map((cat) => (
                        <Link
                          key={cat}
                          to={`/collections/all?gender=${gender}&category=${cat}`}
                          onClick={toggleNavDrawer}
                          className="block text-sm text-text-secondary hover:text-accent transition"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="border-t border-border pt-4">
                  <p className="text-text-primary font-semibold">Collections</p>
                  <div className="ml-3 mt-1 space-y-1">
                    {collections.map((col) => (
                      <Link
                        key={col}
                        to={`/collections/all?collection=${col}`}
                        onClick={toggleNavDrawer}
                        className="block text-sm text-text-secondary hover:text-accent transition"
                      >
                        {col}
                      </Link>
                    ))}
                  </div>
                </div>

                {user && user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={toggleNavDrawer}
                    className="block text-text-secondary font-medium py-2 hover:text-accent"
                  >
                    Admin
                  </Link>
                )}
              </nav>
            </motion.div>

            <motion.div
              onClick={toggleNavDrawer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

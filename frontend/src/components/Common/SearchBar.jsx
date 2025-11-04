/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slices/productsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleSearchToggle = (e) => {
    e.preventDefault();
    if (window.innerWidth < 640) setIsMobileOpen(true);
    else setIsOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setSearchTerm("");
    setIsOpen(false);
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if ((isOpen || isMobileOpen) && inputRef.current) inputRef.current.focus();
  }, [isOpen, isMobileOpen]);

  return (
    <>
      {/* 🔹 Desktop / Tablet Search */}
      <div ref={wrapperRef} className="relative flex items-center">
        <AnimatePresence>
          {isOpen && (
            <motion.form
              onSubmit={handleSearch}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "16rem", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden sm:flex items-center border border-gray-700 bg-black/60 backdrop-blur-xl rounded-full overflow-hidden shadow-md px-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm text-gray-200 px-2 py-1 w-full focus:outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                className="text-gray-400 hover:text-accent transition p-1"
              >
                <HiMagnifyingGlass className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-accent transition p-1"
              >
                <HiMiniXMark className="h-5 w-5" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* 🔸 Search Icon Trigger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSearchToggle}
          className="ml-2 flex items-center justify-center text-gray-400 hover:text-accent transition"
        >
          <HiMagnifyingGlass className="h-6 w-6" />
        </motion.button>
      </div>

      {/* 🔹 Mobile Fullscreen Search */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col px-4 pt-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center mb-4">
              <motion.h2
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-semibold text-gray-200"
              >
                Search
              </motion.h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileOpen(false)}
              >
                <HiMiniXMark className="h-7 w-7 text-gray-400 hover:text-accent transition" />
              </motion.button>
            </div>

            <motion.form
              onSubmit={handleSearch}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="flex items-center gap-2 border border-gray-700 rounded-full px-3 py-2 bg-black/50 shadow-inner"
            >
              <HiMagnifyingGlass className="h-5 w-5 text-accent" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-base text-gray-200 placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="text-accent font-medium hover:opacity-80 transition"
              >
                Search
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;

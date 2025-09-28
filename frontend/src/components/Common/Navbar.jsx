import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex item-center justify-between px-6 py-4 bg-amber-50 ">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Brand / Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            MyStore
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/collections/all"
              className="hover:text-black text-gray-700 text-sm font-medium uppercase transition"
            >
              Men
            </Link>
            <Link
              to="/collections/all"
              className="hover:text-black text-gray-700 text-sm font-medium uppercase transition"
            >
              Women
            </Link>
            <Link
              to="/collections/all"
              className="hover:text-black text-gray-700 text-sm font-medium uppercase transition"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all"
              className="hover:text-black text-gray-700 text-sm font-medium uppercase transition"
            >
              Bottom Wear
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="flex items-center space-x-6">
            <Link to="/profile" className="hover:text-black transition">
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
            </Link>

            <button
              onClick={toggleCartDrawer}
              className="relative hover:text-black transition"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Search */}
            <div className="overflow-hidden">
              <SearchBar />
            </div>
            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 " />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all"
              onClick={toggleNavDrawer}
              className="block py-2 text-gray-700 hover:text"
            >
              Men
            </Link>
            <Link
              to="/collections/all"
              onClick={toggleNavDrawer}
              className="block py-2 text-gray-700 hover:text"
            >
              Women
            </Link>
            <Link
              to="/collections/all"
              onClick={toggleNavDrawer}
              className="block py-2 text-gray-700 hover:text"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all"
              onClick={toggleNavDrawer}
              className="block py-2 text-gray-700 hover:text"
            >
              Bottom wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;

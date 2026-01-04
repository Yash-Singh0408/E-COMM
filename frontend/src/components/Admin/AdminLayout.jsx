import React from "react";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen h-[100vh] flex flex-col md:flex-row relative bg-[var(--color-bg)] text-[var(--color-text-primary)] transition-colors duration-300">
      {/* 🌙 Mobile Header */}
      <div className="flex md:hidden p-4 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] z-30 shadow-md items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="focus:outline-none hover:text-[var(--color-accent)] transition-colors"
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-semibold tracking-wide">Admin Dashboard</h1>
        </div>
      </div>

      {/* 🔲 Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* 🧱 Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed md:relative z-30 md:z-20 w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] shadow-lg md:translate-x-0 h-screen"
          >
            <AdminSidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🖥️ Desktop Sidebar (always visible) */}
      <div className="hidden md:block md:relative w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] shadow-lg">
        <AdminSidebar />
      </div>

      {/* 📄 Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-grow p-6 overflow-auto custom-scroll"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default AdminLayout;

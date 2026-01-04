import React from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
  FaTachometerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const navItems = [
  { to: "/admin", icon: <FaTachometerAlt />, label: "Dashboard" },
  { to: "/admin/users", icon: <FaUser />, label: "Users" },
  { to: "/admin/products", icon: <FaBoxOpen />, label: "Products" },
  { to: "/admin/orders", icon: <FaClipboardList />, label: "Orders" },
  { to: "/", icon: <FaStore />, label: "Shop" },
];

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-[100vh] w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] p-6 shadow-lg flex flex-col justify-between"
    >
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-semibold text-[var(--color-accent)] tracking-wide">
            Admin Panel
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Manage your store
          </p>
        </motion.div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={label}
              to={to}
              end
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-accent)] text-black font-semibold shadow-md"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-highlight)]"
                }`
              }
            >
              <motion.span
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-lg"
              >
                {icon}
              </motion.span>
              <span>{label}</span>

              {/* Accent indicator bar on active links */}
              {location.pathname === to && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-accent)] rounded-r"
                />
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full font-medium bg-[var(--color-error)] hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all duration-200"
        >
          <FaSignOutAlt className="text-lg" /> <span>Logout</span>
        </motion.button>
      </motion.div>
    </motion.aside>
  );
};

export default AdminSidebar;

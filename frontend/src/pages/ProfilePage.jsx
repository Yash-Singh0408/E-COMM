import React, { useEffect } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section — User Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-sm p-6 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
              {user?.name}
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6 break-all">
              {user?.email}
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2.5 rounded-sm hover:bg-red-700 transition-all duration-300 font-medium"
            >
              Logout
            </button>
          </div>

          {/* Right Section — Orders */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

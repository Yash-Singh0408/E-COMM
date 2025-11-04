import React, { useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet, useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text-primary">
      <ScrollToTop />
      <Header />

      {/* Main content area */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default UserLayout;

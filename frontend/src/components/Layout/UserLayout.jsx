import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
    <div className="mx-auto">
      <Header />
        <main>
          <Outlet />
        </main>
      <Footer />
    </div>
    </>
  );
}

export default UserLayout;

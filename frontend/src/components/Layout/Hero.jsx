import React from "react";
import heroImg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Hero Section"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content (kept above overlay) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white p-6 font-bold">
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold tracking-tighter uppercase mb-4">
            Trendy Collections
          </h1>
          <p className="text-sm md:text-lg mb-6">
            Your one-stop destination for all your shopping needs
          </p>
          <Link
            to="/shop"
            className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg hover:bg-gray-200 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

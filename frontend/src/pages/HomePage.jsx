import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  useEffect(() => {
    // Fetch prodcts for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      })
    );

    // fetch best seller
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products/getBestSellingProduct`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);


  return (
    <div>
      {/* Hero Section with background image  */}
      <Hero />

      {/* A women and men picture with links to their collections */}
      <GenderCollectionSection />

      {/* New Arrivals data fetched by date of creation */}
      <NewArrivals />

      {/* Best Sellers Section */}
      <section className=" text-gray-100 mb-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 text-white bg-clip-text  drop-shadow-md">
            Best <span className="text-[#d6a354]">Sellers</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Discover what everyone’s loving this season.
          </p>
        </div>

        {bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct[0]._id} isBestSeller />
        ) : (
          <p className="text-center text-gray-500">Loading best sellers...</p>
        )}
      </section>

      <FeaturesSection />

      {/* Women Products */}
      <section className="relative py-20 sm:py-24 bg-[#0b0b0b] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Animated Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-[#b3b3b3] mb-4">
              Featured Collection
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#f5f5f5]">
              Women Products of the <span className="text-[#d6a354]">Week</span>
            </h2>
            <motion.div
              className="mx-auto w-24 h-[2px] bg-[#d6a354] rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Animated Product Grid */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ProductGrid products={products} loading={loading} error={error} />
          </motion.div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              to="/collections/all?gender=Women"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#d6a354] text-[#0b0b0b] rounded-sm font-semibold hover:bg-[#e0b366] transition text-sm sm:text-base"
            >
              View All Women Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Dummy section  */}
      <FeaturedCollection />
    </div>
  );
};

export default HomePage;

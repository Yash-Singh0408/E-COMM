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

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  useEffect(() => {
    // Fetch prodcts for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
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

  // if (bestSellerProduct) {
  //   console.log(bestSellerProduct[0]._id);
  // }
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      <h2 className="text-3xl text-center font-bold  mb-3">Best Sellers</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct[0]._id} />
      ) : (
        <p className="text-center">Loading best sellers...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Women Products of the Week
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;

import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../../src/redux/slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sideBarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, searchParams, collection]);

  const toggleSideBar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 m-2 flex justify-center text-black items-center rounded-md bg-gray-100"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Sidebar */}
      <div
        ref={sideBarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed  inset-y-0 left-0 z-50 w-64 shadow-lg overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:shadow-none`}
      > 
        <FilterSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 lg:w-10">
        {/* Header Section (Responsive) */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h2 className="text-2xl uppercase font-semibold text-color-text-primary">
            All Collection
          </h2>

          {/* Sort Options (stacked below on mobile) */}
          <div className="w-full sm:w-auto">
            <SortOptions />
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid  products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;

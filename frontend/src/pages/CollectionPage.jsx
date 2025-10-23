import React, { useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import {useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../../src/redux/slices/productsSlice";
const CollectionPage = () => {

  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {products , loading , error} = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  
  const sideBarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({collection, ...queryParams}));
  }, [dispatch, searchParams, collection]);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutSide = (e) => {
    // Close sidebar if clicked outside
    if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutSide);
    // clean event listener
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

 

  return (
    <div className="flex flex-col lg:flex-row">
      {/* {Moboile Filter} */}
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sideBarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 `}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All collection</h2>
        {/* Sort options */}
        <SortOptions />

        {/* Products Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;

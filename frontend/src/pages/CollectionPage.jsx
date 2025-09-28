import React, { useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";


const CollectionPage = () => {
  const [products, setProducts] = React.useState([]);
  const sideBarRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSideBar =() =>{
      setIsSidebarOpen(!isSidebarOpen);
  }

  const handleClickOutSide=(e)=>{
    // Close sidebar if clicked outside
    if(sideBarRef.current && !sideBarRef.current.contains(e.target)){
        setIsSidebarOpen(false);
    }
  }

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutSide);
    // clean event listener
   return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: "1",
          name: "Similar Product 1",
          price: "89.99",
          images: [{ url: "https://picsum.photos/500/500?random=3" }],
        },
        {
          _id: "2",
          name: "Similar Product 2",
          price: "79.99",
          images: [{ url: "https://picsum.photos/500/500?random=4" }],
        },
        {
          _id: "3",
          name: "Similar Product 3",
          price: "99.99",
          images: [{ url: "https://picsum.photos/500/500?random=5" }],
        },
        {
          _id: "4",
          name: "Similar Product 4",
          price: "59.99",
          images: [{ url: "https://picsum.photos/500/500?random=6" }],
        },
        {
          _id: "5",
          name: "Similar Product 5",
          price: "69.99",
          images: [{ url: "https://picsum.photos/500/500?random=7" }],
        },
        {
          _id: "6",
          name: "Similar Product 6",
          price: "49.99",
          images: [{ url: "https://picsum.photos/500/500?random=8" }],
        },
        {
          _id: "7",
          name: "Similar Product 7",
          price: "39.99",
          images: [{ url: "https://picsum.photos/500/500?random=9" }],
        },
        {
          _id: "8",
          name: "Similar Product 8",
          price: "29.99",
          images: [{ url: "https://picsum.photos/500/500?random=10" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return <div className="flex flex-col lg:flex-row">
    {/* {Moboile Filter} */}
    <button onClick={toggleSideBar} className="lg:hidden border p-2 flex justify-center items-center">
        <FaFilter className="mr-2" /> Filters
    </button>

    {/* Filter Sidebar */}
    <div ref={sideBarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 `}>
        <FilterSidebar />
    </div>
    <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All collection</h2>
        {/* Sort options */}
        <SortOptions />

        {/* Products Grid */}
        <ProductGrid products={products} />
    </div>
  </div>;
};

export default CollectionPage;

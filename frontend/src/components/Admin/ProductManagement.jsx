import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";
import PremiumLoader from "../Common/PremiumLoader";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );
  const { user } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAdminProducts());
    }
  }, [dispatch, navigate, user]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // Filtered product list
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    let matchesPrice = true;

    if (priceFilter === "low") matchesPrice = p.price < 50;
    else if (priceFilter === "mid")
      matchesPrice = p.price >= 50 && p.price < 100;
    else if (priceFilter === "high") matchesPrice = p.price >= 100;

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 text-[var(--color-text-primary)]">
      {/* Page Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6 text-[var(--color-accent)]"
      >
        Product Management
      </motion.h2>
      {/* Summary */}
      <div className="text-sm text-[var(--color-text-secondary)] mb-4 flex justify-between items-center">
        <div>
          Showing{" "}
        <span className="font-semibold text-[var(--color-accent)]">
          {products.length}
        </span>{" "}
        total orders
        </div>

           <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end mb-4"
      >
      
        <Link
          to="/admin/products/create"
          className="bg-[var(--color-accent)] text-black px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-all shadow-sm"
        >
          + Create Product
        </Link>
      </motion.div>
      </div>

   

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 rounded-xl shadow-sm sticky top-0 z-10"
      >
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          <option value="all" className="bg-black">
            All Prices
          </option>
          <option value="low" className="bg-black">
            Below $50
          </option>
          <option value="mid" className="bg-black">
            $50 - $100
          </option>
          <option value="high" className="bg-black">
            $100+
          </option>
        </select>
      </motion.div>

      {/* Main Table */}
      {loading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[var(--color-text-secondary)]"
        >
          <PremiumLoader />
        </motion.p>
      ) : error ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-500 font-medium"
        >
          Error: {error}
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="shadow-md border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-secondary)] overflow-hidden"
          style={{ height: "70vh" }} // Fixed height container
        >
          <div className="overflow-y-auto h-full custom-scrollbar">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[var(--color-bg-highlight)] text-[var(--color-text-secondary)] uppercase text-xs tracking-wide sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, i) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{
                        backgroundColor: "var(--color-bg-highlight)",
                      }}
                      className="border-b border-[var(--color-border)] transition-all"
                    >
                      <td className="p-4 font-medium text-[var(--color-text-primary)] whitespace-nowrap">
                        {product.name}
                      </td>
                      <td className="p-4 text-[var(--color-text-secondary)]">
                        ${product.price?.toFixed(2)}
                      </td>
                      <td className="p-4 text-[var(--color-text-secondary)]">
                        {product.sku || "—"}
                      </td>
                      <td className="p-4 flex flex-wrap gap-2">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-all shadow-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-all shadow-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-6 text-center text-[var(--color-text-secondary)]"
                    >
                      No products match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductManagement;

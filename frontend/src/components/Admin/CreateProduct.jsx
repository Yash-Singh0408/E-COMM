import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { createProduct } from "../../redux/slices/adminProductSlice";
import PremiumLoader from "../Common/PremiumLoader";

const CreateProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Upload Image
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProductData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          { url: data.imageUrl, public_id: data.public_id },
        ],
      }));
      console.log("🟢 Image uploaded successfully:", data.public_id);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete Image
  const handleDeleteImage = async (public_id, url) => {
    if (!public_id) {
      console.warn("⚠️ No public_id found, removing locally only.");
      setProductData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.url !== url),
      }));
      return;
    }

    try {
      setDeleting(public_id);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/upload/delete`, {
        params: { public_id },
      });

      setProductData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.public_id !== public_id),
      }));
    } catch (err) {
      console.error("Error deleting image:", err);
    } finally {
      setDeleting(null);
    }
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Basic Validation ---
    if (!productData.category || !productData.collections || !productData.gender) {
      alert("Please select category, collection, and gender before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      await dispatch(createProduct(productData));
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) return <PremiumLoader />;

  return (
    <div className="max-w-5xl mx-auto p-6 text-[var(--color-text-primary)]">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold mb-6 text-[var(--color-accent)]"
      >
        Create New Product
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-[var(--color-bg-secondary)] p-6 rounded-xl shadow-lg border border-[var(--color-border)] space-y-6"
      >
        {/* --- Product Name --- */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
            required
          />
        </div>

        {/* --- Description --- */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={productData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        {/* --- Price & Stock --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
              Count in Stock
            </label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>
        </div>

        {/* --- SKU --- */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
            required
          />
        </div>

        {/* --- Category, Collection, Gender --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              placeholder="e.g. Shirts, Hoodies"
              className="w-full p-3 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          {/* Collections */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
              Collection
            </label>
            <input
              type="text"
              name="collections"
              value={productData.collections}
              onChange={handleChange}
              placeholder="e.g. Summer 2025"
              className="w-full p-3 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
              Gender
            </label>
            <select
              name="gender"
              value={productData.gender}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            >
              <option value="">Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* --- Sizes & Colors --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
              Sizes (comma separated)
            </label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  sizes: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="w-full p-3 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
              Colors (comma separated)
            </label>
            <input
              type="text"
              name="colors"
              value={productData.colors.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  colors: e.target.value.split(",").map((c) => c.trim()),
                })
              }
              className="w-full p-3 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
        </div>

        {/* --- Images --- */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
            Product Images
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="text-[var(--color-text-secondary)]"
          />
          {uploading && (
            <p className="text-[var(--color-accent)] mt-2 animate-pulse">
              Uploading...
            </p>
          )}
          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images.map((img) => (
              <motion.div
                key={img.public_id || img.url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <img
                  src={img.url}
                  alt=""
                  className="w-24 h-24 object-cover rounded-md border border-[var(--color-border)] shadow-md"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteImage(img.public_id)}
                  disabled={deleting === img.public_id}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  {deleting === img.public_id ? "…" : "✕"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Submit --- */}
        <button
          type="submit"
          className="w-full py-3 bg-[var(--color-accent)] text-black font-semibold rounded-md hover:opacity-90 transition-all"
        >
          Create Product
        </button>
      </motion.form>
    </div>
  );
};

export default CreateProductsPage;

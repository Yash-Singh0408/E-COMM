import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Check, Link } from "lucide-react";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import ProductGrid from "./ProductGrid";

const ProductDetails = ({ productId  , isBestSeller= false}) => {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;


  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    setQuantity((prev) =>
      action === "plus" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size before adding to cart", {
        duration: 2000,
      });
      return;
    }
    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully", { duration: 2000 });
      })
      .finally(() => setIsButtonDisabled(false));
  };

  const colorMap = {
    Black: "#000000",
    White: "#FFFFFF",
    Gray: "#808080",
    Navy: "#001f3f",
    Blue: "#0074D9",
    Red: "#FF4136",
    Beige: "#F5F5DC",
    Brown: "#8B4513",
    Green: "#228B22",
    Pink: "#FFC0CB",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-color-bg">
        <p className="text-color-text-secondary text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-color-bg">
        <p className="text-color-error text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!selectedProduct) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6 bg-color-bg">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Product Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Images Section */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible hide-scrollbar">
              {selectedProduct.images?.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMainImage(image.url)}
                  className={`flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 transition-all ${
                    mainImage === image.url
                      ? "border-color-accent"
                      : "border-color-border hover:border-color-accent/50"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 h-[400px] lg:h-[750px] rounded-sm overflow-hidden bg-color-bg-secondary border border-color-border relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  alt="Product"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {(selectedProduct.discountePrice || isBestSeller) && (
                <div className="absolute top-4 right-4 bg-accent text-black text-xs font-bold px-3 py-1 rounded-sm">
                  SALE
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Product Title */}
              {selectedProduct.brand && (
                <p className="text-xs tracking-[0.2em] uppercase text-color-text-secondary mb-2">
                  {selectedProduct.brand}
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-color-text-primary mb-4">
                {selectedProduct.name}
              </h1>


              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-semibold text-color-accent">
                  ${((selectedProduct.discountPrice)).toFixed(2)}
                </span>
                {selectedProduct.price && (
                  <span className="text-lg text-color-text-secondary line-through">
                    ${((selectedProduct.price)).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              {selectedProduct.description && (
                <p className="text-color-text-secondary mb-8 leading-relaxed">
                  {selectedProduct.description}
                </p>
              )}

              {/* Color Selector */}
              {selectedProduct.colors?.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-color-text-primary font-medium mb-3 tracking-wide">
                    COLOR
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-10 h-10 rounded-sm border-2 transition-all ${
                          selectedColor === color
                            ? "border-color-accent scale-110"
                            : "border-color-border hover:border-color-accent/50"
                        }`}
                        style={{
                          backgroundColor:
                            colorMap[color] || color.toLowerCase(),
                        }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <Check
                            className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            strokeWidth={3}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {selectedProduct.sizes?.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-color-text-primary font-medium mb-3 tracking-wide">
                    SIZE
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2 rounded-sm text-sm font-medium transition-all ${
                          selectedSize === size
                            ? "bg-[#d6a354] text-black"
                            : "bg-color-bg-secondary text-color-text-secondary border border-color-border hover:border-color-accent"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-sm text-color-text-primary font-medium mb-3 tracking-wide">
                  QUANTITY
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="w-10 h-10 flex items-center justify-center bg-color-bg-secondary hover:bg-color-bg-highlight border border-color-border rounded-sm transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4 text-color-text-secondary" />
                  </button>
                  <span className="text-lg font-medium text-color-text-primary min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="w-10 h-10 flex items-center justify-center bg-color-bg-secondary hover:bg-color-bg-highlight border border-color-border rounded-sm transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4 text-color-text-secondary" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                whileHover={{ scale: isButtonDisabled ? 1 : 1.02 }}
                whileTap={{ scale: isButtonDisabled ? 1 : 0.98 }}
                className={`w-full bg-accent text-white py-4 rounded-sm font-semibold text-base transition-all ${
                  isButtonDisabled
                    ? "bg-color-border text-color-text-secondary cursor-not-allowed"
                    : "bg-color-accent text-color-bg hover:brightness-110"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "Add to Cart"}
              </motion.button>

              {/* Product Details */}
              {(selectedProduct.brand || selectedProduct.material) && (
                <div className="mt-8 pt-8 border-t border-color-border">
                  <h3 className="text-sm text-color-text-primary font-medium mb-4 tracking-wide">
                    PRODUCT DETAILS
                  </h3>
                  <div className="space-y-2 text-sm">
                    {selectedProduct.brand && (
                      <div className="flex justify-between">
                        <span className="text-color-text-secondary">Brand</span>
                        <span className="text-color-text-primary">
                          {selectedProduct.brand}
                        </span>
                      </div>
                    )}
                    {selectedProduct.material && (
                      <div className="flex justify-between">
                        <span className="text-color-text-secondary">
                          Material
                        </span>
                        <span className="text-color-text-primary">
                          {selectedProduct.material}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You might also like
          </h2>
          <ProductGrid products={similarProducts} loading={loading} error={error} />
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
import { toast } from "sonner";
import React, { useEffect } from "react";
import ProductGrid from "./ProductGrid";

const ProductDetails = () => {
  const seletctedProduct = {
    name: "Product Name",
    price: "199.99",
    originalPrice: "249.99",
    description:
      "This is a detailed description of the product. It highlights features, specifications, and other relevant information that helps customers make informed purchasing decisions.",
    brand: "Brand Name",
    material: "Material Type",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        alt: "Product Image",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        alt: "Product Image",
      },
    ],
  };

  const similarProducts = [
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
  ];

  const [mainImage, setMainImage] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  useEffect(() => {
    if (seletctedProduct.images.length > 0) {
      setMainImage(seletctedProduct.images[0].url);
    }
  }, []);

  //   Handle Quantity Change
  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  //   Handle Add to Cart

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size before adding to cart", {
        duration: 2000,
      });
      return;
    }
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
      toast.success("Product added to cart", {
        duration: 2000,
      });
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Image */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {seletctedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url
                    ? "border-black border-2"
                    : "border-transparent"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt={seletctedProduct.images[0].alt || "Main Product"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Mobile Images */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {seletctedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url
                    ? "border-black border-2"
                    : "border-transparent"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Right Details */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {seletctedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {seletctedProduct.originalPrice &&
                `$${seletctedProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-600 mb-4">
              {seletctedProduct.price && `$${seletctedProduct.price}`}
            </p>
            <p className="text-gray-600 mb-4">{seletctedProduct.description}</p>

            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {seletctedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "border-black border-2"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {seletctedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded  ${
                      selectedSize === size
                        ? "bg-black text-white border-2"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex item-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-500 text-lg"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-500 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white px-6 py-2 rounded w-full mb-6 ${
                isButtonDisabled ? "bg-gray-900 cursor-not-allowed" : ""
              } hover:bg-gray-800 transition`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>

            <div className="mt-6 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Charateristics: </h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{seletctedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{seletctedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You might also like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

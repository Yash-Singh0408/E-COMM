import { toast } from "sonner";
import React, { useEffect } from "react";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({productId}) => {
// console.log("PRODUCT ID",productId);
  const params = useParams();
  const id = params?.id;
  // console.log(" ID ",id);
  const dispatch = useDispatch();
  const {selectedProduct , loading, error , similarProducts} = useSelector((state) => state.products);
  const {user , guestId} = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const productFetchId = productId || id;
  // console.log("Product id",productFetchId);
  useEffect(() => {
    if(productFetchId){
      dispatch(fetchProductDetails(productFetchId))
      dispatch(fetchSimilarProducts(productFetchId))   //might be a problem
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

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
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id
      })
    ).then(
      ()=>{
        toast.success("Product added to cart successfully", {
          duration: 2000,
        });
      })
      .finally(()=>{
        setIsButtonDisabled(false);
      })
  };

  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>Error: {error}</p>
  }

  return (
    <div className="p-6">
    {selectedProduct && (
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Image */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
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
                alt={selectedProduct.images[0].alt || "Main Product"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Mobile Images */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
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
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice &&
                `$${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-600 mb-4">
              {selectedProduct.price && `$${selectedProduct.price}`}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
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
                {selectedProduct.sizes.map((size) => (
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
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
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
          <ProductGrid products={similarProducts} loading={loading} error={error} />
        </div>
      </div>
    )}
    </div>
  );
};

export default ProductDetails;

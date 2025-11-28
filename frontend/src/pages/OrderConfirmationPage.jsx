import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, MapPin, CreditCard, Calendar, Truck } from "lucide-react";
import { clearCart } from "../redux/slices/cartSlice";

const calculateEstimateDelivery = (createdAt) => {
  const orderDate = new Date(createdAt);
  orderDate.setDate(orderDate.getDate() + 7);
  return orderDate.toLocaleDateString();
};

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.checkout);

  // Clear the cart after successful checkout
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-[#d6a354] rounded-full mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-[#0b0b0b]" strokeWidth={2.5} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl font-bold text-[#f5f5f5] mb-3"
          >
            Order Confirmed!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[#b3b3b3] text-lg"
          >
            Thank you for your purchase. Your order is being processed.
          </motion.p>
        </motion.div>

        {checkout && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-[#141414] border border-[#2a2a2a] rounded-sm overflow-hidden"
          >
            {/* Order Info Header */}
            <div className="p-6 border-b border-[#2a2a2a] flex flex-col sm:flex-row justify-between gap-6">
              {/* Order ID & Date */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-[#d6a354]" />
                  <h2 className="text-lg font-semibold text-[#f5f5f5]">
                    Order #{checkout._id.slice(-8).toUpperCase()}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#b3b3b3]">
                  <Calendar className="w-4 h-4" />
                  {new Date(checkout.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="flex items-center gap-3 bg-[#d6a354]/10 border border-[#d6a354]/20 rounded-sm px-4 py-3">
                <Truck className="w-5 h-5 text-[#d6a354]" />
                <div>
                  <p className="text-xs text-[#b3b3b3] mb-1">Estimated Delivery</p>
                  <p className="text-sm font-semibold text-[#d6a354]">
                    {calculateEstimateDelivery(checkout.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 border-b border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-[#f5f5f5] mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#d6a354]" />
                Order Items
              </h3>
              
              <div className="space-y-4">
                {checkout.checkoutItems.map((item, index) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 p-4 bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-[#141414] border border-[#2a2a2a]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-[#f5f5f5] mb-1 truncate">
                        {item.name}
                      </h4>
                      <div className="flex gap-3">
                        <span className="text-xs text-[#b3b3b3] bg-[#141414] px-2 py-1 rounded-sm border border-[#2a2a2a]">
                          {item.color}
                        </span>
                        <span className="text-xs text-[#b3b3b3] bg-[#141414] px-2 py-1 rounded-sm border border-[#2a2a2a]">
                          {item.size}
                        </span>
                      </div>
                    </div>

                    {/* Price & Quantity */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#d6a354] mb-1">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                      <p className="text-xs text-[#b3b3b3]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Payment & Shipping Info */}
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-[#d6a354]" />
                  <h4 className="text-base font-semibold text-[#f5f5f5]">
                    Payment Method
                  </h4>
                </div>
                <p className="text-[#b3b3b3]">PayPal</p>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#d6a354]" />
                  <h4 className="text-base font-semibold text-[#f5f5f5]">
                    Shipping Address
                  </h4>
                </div>
                <p className="text-[#b3b3b3] leading-relaxed">
                  {checkout.shippingAddress.address}<br />
                  {checkout.shippingAddress.city}<br />
                  {checkout.shippingAddress.country}
                </p>
              </motion.div>
            </div>

            {/* Total */}
            <div className="p-6 bg-[#0b0b0b] border-t border-[#2a2a2a]">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#f5f5f5]">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-[#d6a354]">
                  ${checkout.checkoutItems
                    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/my-orders")}
            className="px-8 py-3 bg-[#d6a354] text-[#0b0b0b] font-semibold rounded-sm transition-all"
          >
            View My Orders
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-[#141414] text-[#f5f5f5] font-semibold rounded-sm border border-[#2a2a2a] hover:border-[#d6a354] transition-all"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
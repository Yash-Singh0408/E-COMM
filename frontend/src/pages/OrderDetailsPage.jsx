import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchOrderDetails } from "../redux/slices/orderSlice";
import { Package, CreditCard, MapPin, Truck } from "lucide-react";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--color-bg)] text-[var(--color-text-secondary)]">
        Loading order details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--color-bg)] text-[var(--color-error)]">
        Error: {error}
      </div>
    );

  if (!orderDetails)
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--color-bg)] text-[var(--color-text-secondary)]">
        No order found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-[var(--color-text-primary)] text-center"
      >
        Order Details
      </motion.h2>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-sm p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary)]">
              Order #{orderDetails._id.slice(-8).toUpperCase()}
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm mt-1">
              {new Date(orderDetails.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
            <span
              className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
                orderDetails.isPaid
                  ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                  : "bg-[var(--color-error)]/20 text-[var(--color-error)]"
              }`}
            >
              Payment: {orderDetails.isPaid ? "Paid" : "Unpaid"}
            </span>
            <span
              className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-full mt-2 ${
                orderDetails.isDelivered
                  ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                  : "bg-yellow-500/20 text-yellow-500"
              }`}
            >
              Delivery: {orderDetails.isDelivered ? "Delivered" : "Pending"}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-5 h-5 text-[var(--color-accent)]" />
              <h4 className="text-base font-semibold text-[var(--color-text-primary)]">
                Payment Info
              </h4>
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Method: {orderDetails.paymentMethod || "Not specified"}
            </p>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}
            </p>
          </div>

          <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
              <h4 className="text-base font-semibold text-[var(--color-text-primary)]">
                Shipping Info
              </h4>
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm">
              {orderDetails.shippingAddress?.address}
            </p>
            <p className="text-[var(--color-text-secondary)] text-sm">
              {orderDetails.shippingAddress?.city},{" "}
              {orderDetails.shippingAddress?.country}
            </p>
          </div>

          <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-[var(--color-accent)]" />
              <h4 className="text-base font-semibold text-[var(--color-text-primary)]">
                Shipping Method
              </h4>
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm">
              {orderDetails.shippingMethod || "Standard Delivery"}
            </p>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto custom-scroll mb-8">
          <h4 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)] flex items-center gap-2">
            <Package className="w-5 h-5 text-[var(--color-accent)]" />
            Ordered Products
          </h4>
          <table className="min-w-full border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)]">
            <thead className="bg-[var(--color-bg-highlight)] text-[var(--color-text-primary)]">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItems.map((item) => (
                <tr
                  key={item.productId}
                  className="border-t border-[var(--color-border)] hover:bg-[var(--color-bg-highlight)] transition-colors duration-300"
                >
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-sm border border-[var(--color-border)]"
                    />
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-[var(--color-accent)] hover:underline"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">${item.price}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--color-accent)]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t border-[var(--color-border)] pt-4">
          <span className="text-[var(--color-text-primary)] font-semibold">
            Total Amount
          </span>
          <span className="text-xl font-bold text-[var(--color-accent)]">
            ${orderDetails.totalPrice?.toFixed(2)}
          </span>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/my-orders"
            className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold rounded-sm hover:opacity-90 transition-all"
          >
            Back to My Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetailsPage;

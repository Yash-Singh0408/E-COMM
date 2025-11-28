import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchUserOrders } from "../redux/slices/orderSlice";
import { Package, CreditCard, Calendar, MapPin } from "lucide-react";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--color-bg)] text-[var(--color-text-secondary)]">
        Loading your orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--color-bg)] text-[var(--color-error)]">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-[var(--color-text-primary)] text-center"
      >
        My Orders
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="overflow-x-auto rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] custom-scroll"
      >
        <table className="min-w-full text-sm text-[var(--color-text-secondary)]">
          <thead className="bg-[var(--color-bg-highlight)] text-[var(--color-text-primary)] uppercase text-xs tracking-wider">
            <tr>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Order ID</th>
              <th className="py-4 px-6 text-left">Created</th>
              <th className="py-4 px-6 text-left">Shipping</th>
              <th className="py-4 px-6 text-left">Items</th>
              <th className="py-4 px-6 text-left">Total</th>
              <th className="py-4 px-6 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-highlight)] transition-colors duration-300 cursor-pointer"
                >
                  <td className="py-4 px-6">
                    <img
                      src={order.orderItems[0]?.image}
                      alt={order.orderItems[0]?.name}
                      className="w-12 h-12 object-cover rounded-sm border border-[var(--color-border)]"
                    />
                  </td>

                  <td className="py-4 px-6 text-[var(--color-text-primary)] font-medium truncate max-w-[120px]">
                    #{order._id.slice(-8).toUpperCase()}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs sm:text-sm truncate max-w-[140px]">
                      <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                      {order.shippingAddress
                        ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                        : "N/A"}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Package className="w-4 h-4 text-[var(--color-accent)]" />
                      {order.orderItems.length} items
                    </div>
                  </td>

                  <td className="py-4 px-6 text-[var(--color-accent)] font-semibold">
                    ${order.totalPrice.toFixed(2)}
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 text-xs sm:text-sm rounded-full font-medium ${
                        order.isPaid
                          ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                          : "bg-[var(--color-error)]/20 text-[var(--color-error)]"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-[var(--color-text-secondary)]"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default MyOrdersPage;

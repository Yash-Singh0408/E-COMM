import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaUserAlt,
  FaMoneyBillWave,
  FaTruck,
  FaCheck,
  FaFilter,
} from "react-icons/fa";
import PremiumLoader from "../Common/PremiumLoader";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  const { user } = useSelector((state) => state.auth);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, navigate, user]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  const getStatusBadge = (status) => {
    const styles = {
      Processing: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
      Shipped: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
      Delivered: "bg-green-500/20 text-green-400 border border-green-500/30",
      Cancelled: "bg-red-500/20 text-red-400 border border-red-500/30",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  if (loading) {
    return(
      <PremiumLoader />
    )
  }

  if (error) {
    return (
      <div className="text-center text-[var(--color-error)] font-medium mt-10">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6 text-[var(--color-text-primary)]"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center">
          <FaBoxOpen className="text-[var(--color-accent)] mr-3 text-2xl" />
          <h2 className="text-3xl font-bold tracking-tight">Order Management</h2>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <FaFilter className="text-[var(--color-accent)]" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm rounded-lg focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] p-2"
          >
            <option value="All">All Orders</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        Showing{" "}
        <span className="font-semibold text-[var(--color-accent)]">
          {filteredOrders.length}
        </span>{" "}
        {filterStatus === "All" ? "total" : filterStatus.toLowerCase()} orders
      </p>

      {/* Table Container */}
      <div className="bg-[var(--color-bg-secondary)] rounded-2xl shadow-lg overflow-hidden border border-[var(--color-border)]">
        <div className="overflow-y-auto max-h-[65vh] custom-scrollbar">
          <table className="min-w-full text-left text-sm text-[var(--color-text-secondary)]">
            <thead className="bg-[var(--color-bg-highlight)] text-xs uppercase font-semibold text-[var(--color-text-primary)] border-b border-[var(--color-border)]">
              <tr>
                <th className="py-3 px-5">
                  <FaBoxOpen className="inline mr-2 text-[var(--color-accent)]" />
                  Order ID
                </th>
                <th className="py-3 px-5">
                  <FaUserAlt className="inline mr-2 text-[var(--color-accent)]" />
                  Customer
                </th>
                <th className="py-3 px-5">
                  <FaMoneyBillWave className="inline mr-2 text-[var(--color-accent)]" />
                  Total Price
                </th>
                <th className="py-3 px-5">
                  <FaTruck className="inline mr-2 text-[var(--color-accent)]" />
                  Status
                </th>
                <th className="py-3 px-5 text-center">
                  <FaCheck className="inline mr-2 text-[var(--color-accent)]" />
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, i) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-[var(--color-bg-highlight)] border-b border-[var(--color-border)] transition-all"
                  >
                    <td className="py-4 px-5 font-medium text-[var(--color-text-primary)] whitespace-nowrap">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-4 px-5">{order.user?.name || "Guest"}</td>
                    <td className="py-4 px-5">${order.totalPrice.toFixed(2)}</td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-xs rounded-lg focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] block w-[7rem] p-1.5 transition-all"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "Delivered")
                        }
                        className="bg-[var(--color-accent)] hover:bg-opacity-80 text-black font-semibold py-2 px-4 rounded-lg transition-all"
                      >
                        Mark Delivered
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-[var(--color-text-secondary)] py-6 font-medium"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderManagement;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";
import PremiumLoader from "../components/Common/PremiumLoader";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

 //  Dynamically calculate monthly revenue from all orders
// const monthlyRevenue = orders?.reduce((acc, order) => {
//   if (!order.createdAt || !order.totalPrice) return acc;
  
  // Extract month name (e.g., "Jan", "Feb")
//   const month = new Date(order.createdAt).toLocaleString("default", { month: "short" });

  // Add totalPrice for that month
//   acc[month] = (acc[month] || 0) + order.totalPrice;
//   return acc;
// }, {});

//  Convert to array format suitable for Recharts
// const revenueData = Object.entries(monthlyRevenue)
//   .map(([month, revenue]) => ({ month, revenue }))
//   .sort(
//     (a, b) =>
//       new Date(`1 ${a.month} 2025`) - new Date(`1 ${b.month} 2025`)
//   );
const revenueData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1900 },
  { month: "Mar", revenue: 2600 },
  { month: "Apr", revenue: 3100 },
  { month: "May", revenue: 4200 },
  { month: "Jun", revenue: totalSales.toFixed(2) || 5000 },
];

  // Pie chart for order status
  const orderStatusData = [
    {
      name: "Delivered",
      value: orders.filter((o) => o.status === "Delivered").length,
    },
    {
      name: "Processing",
      value: orders.filter((o) => o.status === "Processing").length,
    },
    {
      name: "Cancelled",
      value: orders.filter((o) => o.status === "Cancelled").length,
    },
    {
      name: "Shipped",
      value: orders.filter((o) => o.status === "Shipped").length,
    }
  ];

  const COLORS = [
    "var(--color-success)",
    "var(--color-accent)",
    "var(--color-error)",
    "#347aeb",
  ];

  console.log("Orders in AdminHomePage:", orders);

  return (
    <div className="max-w-7xl mx-auto p-6 text-[var(--color-text-primary)]">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-[var(--color-accent)]"
      >
        Admin Dashboard
      </motion.h1>

      {/* Loading / Error Handling */}
      {productsLoading || ordersLoading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[var(--color-text-secondary)]"
        >
          <PremiumLoader />
        </motion.p>
      ) : productsError ? (
        <p className="text-[var(--color-error)]">
          Error fetching products: {productsError}
        </p>
      ) : ordersError ? (
        <p className="text-[var(--color-error)]">
          Error fetching orders: {ordersError}
        </p>
      ) : (
        <>
          {/* ====== Stats Cards ====== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Total Revenue",
                value: `$${totalSales?.toFixed(2) || 0}`,
                link: null,
              },
              {
                title: "Total Orders",
                value: totalOrders || 0,
                link: "/admin/orders",
                linkText: "Manage Orders",
              },
              {
                title: "Total Products",
                value: products?.length || 0,
                link: "/admin/products",
                linkText: "Manage Products",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-[var(--color-bg-secondary)] shadow-md border border-[var(--color-border)] transition-all"
              >
                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                <p className="text-3xl font-bold text-[var(--color-accent)]">
                  {card.value}
                </p>
                {card.link && (
                  <Link
                    to={card.link}
                    className="text-sm text-[var(--color-accent)] hover:underline mt-2 inline-block"
                  >
                    {card.linkText}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* ====== Charts Section ====== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* 📈 Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)]">
                Revenue Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="var(--color-text-secondary)"
                    tickLine={false}
                  />
                  <YAxis
                    stroke="var(--color-text-secondary)"
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-bg-highlight)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-accent)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/*  Order Status Chart */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)]">
                Order Status Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-bg-highlight)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* ====== Recent Orders Table ====== */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6"
          >
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] shadow-md">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[var(--color-bg-highlight)] text-[var(--color-text-secondary)] uppercase text-xs tracking-wide">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Total Price</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.length > 0 ? (
                    orders.slice(0, 5).map((order) => (
                      <motion.tr
                        key={order._id}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        className="border-b border-[var(--color-border)] transition-all cursor-pointer"
                      >
                        <td className="py-3 px-4 text-[var(--color-text-secondary)]">
                          {order._id}
                        </td>
                        <td className="py-3 px-4">
                          {order.user?.name || "Unknown"}
                        </td>
                        <td className="py-3 px-4 text-[var(--color-accent)]">
                          ${order.totalPrice?.toFixed(2) || "0.00"}
                        </td>
                        <td
                          className={`py-3 px-4 font-medium ${
                            order.status === "Delivered"
                              ? "text-[var(--color-success)]"
                              : order.status === "Cancelled"
                              ? "text-[var(--color-error)]"
                              : "text-[var(--color-text-secondary)]"
                          }`}
                        >
                          {order.status}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-4 text-center text-[var(--color-text-secondary)]"
                      >
                        No recent orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AdminHomePage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../redux/slices/adminSlice";
import { motion } from "framer-motion";
import { UserPlus, Trash2, Shield, Mail } from "lucide-react";
import PremiumLoader from "../components/Common/PremiumLoader";

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)]">
        User Management
      </h2>

      {loading && <p className="text-gray-500">
        <PremiumLoader />
      </p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Add User Form */}
      <motion.div
        className="p-6 mb-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-md hover:shadow-lg transition-shadow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[var(--color-accent)]">
          <UserPlus className="w-5 h-5" /> Add New User
        </h3>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-[var(--color-text-secondary)] mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          <div>
            <label className="block text-[var(--color-text-secondary)] mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[var(--color-text-secondary)] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          <div>
            <label className="block text-[var(--color-text-secondary)] mb-1">
              Role
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <Shield className="w-4 h-4 text-gray-400 mr-2" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              >
                <option value="customer" className="bg-black" >Customer</option>
                <option value="admin" className="bg-black">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <motion.button
              type="submit"
              className="bg-[var(--color-accent)] text-black font-semibold py-2 px-4 rounded-lg w-full hover:brightness-110 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add User
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Users Table */}
      <motion.div
        className="overflow-x-auto shadow-md rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] text-sm uppercase">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <motion.tr
                key={u._id}
                className="border-b hover:bg-[var(--color-hover-bg)] transition-all"
              >
                <td className="py-3 px-4 font-medium text-[var(--color-text-primary)]">
                  {u.name}
                </td>
                <td className="py-3 px-4 text-[var(--color-text-secondary)]">{u.email}</td>
                <td className="py-3 px-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="p-2 border text-accent rounded-lg focus:ring-1 focus:ring-[var(--color-accent)]"
                  >
                    <option value="customer" className="bg-black" >Customer</option>
                    <option value="admin" className="bg-black" >Admin</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-center">
                  <motion.button
                    onClick={() => handleDeleteUser(u._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 flex items-center gap-1 justify-center mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default UserManagementPage;

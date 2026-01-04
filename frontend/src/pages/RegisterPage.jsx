import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Sparkles, Heart, Star, Eye, EyeOff } from "lucide-react";
import { registerUser, clearAuthError } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";
import { toast } from "sonner";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading, error } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckOutRedirect = redirect.includes("checkout");

  // 🔔 Show backend error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  // ✅ Successful registration
  useEffect(() => {
    if (user) {
      toast.success("Account created successfully 🎉");

      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckOutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckOutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckOutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      toast.warning("Passwords do not match");
      return;
    }

    setPasswordMatch(true);
    dispatch(registerUser({ name, email, password }));
  };

  const floatingIcons = [
    { Icon: Heart, position: "top-20 left-1/4", size: "w-16 h-16", delay: 0 },
    { Icon: Sparkles, position: "top-1/3 right-1/4", size: "w-12 h-12", delay: 0.5 },
    { Icon: Star, position: "bottom-1/3 left-1/3", size: "w-14 h-14", delay: 1 },
  ];

  return (
    <div className="flex min-h-screen bg-[#0b0b0b] overflow-x-hidden">
      {/* Left Side - Animated Brand Section */}
      <div className="hidden md:flex w-1/2 bg-[#141414] border-r border-[#2a2a2a] items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(214, 163, 84, 0.5) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(214, 163, 84, 0.5) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Gradient Orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d6a354]/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.position}`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
            transition={{ delay: item.delay, duration: 1, type: "spring" }}
          >
            <motion.div
              className={`${item.size} text-[#d6a354]`}
              animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
            >
              <item.Icon className="w-full h-full" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        ))}

        {/* Central Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-12"
        >
          <motion.div
            className="mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <h2 className="text-6xl font-bold text-[#f5f5f5] mb-4">
              Drip<span className="text-[#d6a354]">Nest</span>
            </h2>
            <div className="w-32 h-[2px] bg-[#d6a354] mx-auto mb-6" />
            <p className="text-[#b3b3b3] text-lg max-w-md mx-auto leading-relaxed">
              Join our community of fashion enthusiasts
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {["Exclusive Access", "Member Benefits", "Premium Support"].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                className="bg-[#0b0b0b] border border-[#2a2a2a] px-4 py-2 rounded-sm text-xs text-[#b3b3b3]"
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 relative">
        {/* Subtle background orb */}
        <motion.div
          className="absolute top-1/4 -right-32 w-[28rem] h-[28rem] bg-[#d6a354]/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Form Card */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-[#141414] border border-[#2a2a2a] rounded-sm p-8"
          >
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-2">Create Account</h2>
            <p className="text-[#b3b3b3] text-sm mb-8">
              Join us today! Fill in your details to get started
            </p>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-[#f5f5f5] text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm py-3 pl-11 pr-4 text-[#f5f5f5]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-[#f5f5f5] text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm py-3 pl-11 pr-4 text-[#f5f5f5]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-[#f5f5f5] text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm py-3 pl-11 pr-11 text-[#f5f5f5]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-[#f5f5f5] text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordMatch(true);
                  }}
                  required
                  className={`w-full bg-[#0b0b0b] border rounded-sm py-3 pl-11 pr-11 text-[#f5f5f5] ${
                    !passwordMatch ? "border-red-500 focus:border-red-500" : "border-[#2a2a2a] focus:border-[#d6a354]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {!passwordMatch && <p className="text-red-500 text-xs mt-2">Passwords do not match</p>}
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-[#d6a354] text-[#0b0b0b] font-bold py-3 rounded-sm flex items-center justify-center gap-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </motion.button>

            {/* Login Link */}
            <p className="text-center text-[#b3b3b3] text-sm mt-6">
              Already have an account?{" "}
              <Link
                to={`/login?redirect=${encodeURIComponent(redirect)}`}
                className="text-[#d6a354] hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;

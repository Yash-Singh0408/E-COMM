import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles, ShoppingBag, Star } from 'lucide-react';
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';
  const isCheckOutRedirect = redirect.includes('checkout');

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckOutRedirect ? '/checkout' : '/');
        });
      } else {
        navigate(isCheckOutRedirect ? '/checkout' : '/');
      }
    }
  }, [user, guestId, cart, navigate, isCheckOutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Floating icons for right side
  const floatingIcons = [
    { Icon: ShoppingBag, position: 'top-20 left-1/4', size: 'w-16 h-16', delay: 0 },
    { Icon: Sparkles, position: 'top-1/3 right-1/4', size: 'w-12 h-12', delay: 0.5 },
    { Icon: Star, position: 'bottom-1/3 left-1/3', size: 'w-14 h-14', delay: 1 },
  ];

  const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const pageTransition = {
  duration: 0.5,
  ease: "easeInOut",
};

  return (

    
    <div className="flex min-h-screen bg-[#0b0b0b]">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 relative">
        {/* Subtle background orb */}
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[#d6a354]/5 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Header (Simplified - no brand logo) */}
          <div className="text-center mb-8">
            <motion.h1
              className="text-3xl font-bold text-[#f5f5f5] mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p
              className="text-sm text-[#b3b3b3]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Sign in to continue your shopping journey
            </motion.p>
          </div>

          {/* Form Card */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-[#141414] border border-[#2a2a2a] rounded-sm p-8"
          >
            {/* Email Input */}
            <div className="mb-6">
              <label
                className="block text-[#f5f5f5] text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" />
                <input
                  className="w-full bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm py-3 pl-11 pr-4 text-[#f5f5f5] placeholder-[#b3b3b3] focus:outline-none focus:border-[#d6a354] transition-colors"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                className="block text-[#f5f5f5] text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" />
                <input
                  className="w-full bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm py-3 pl-11 pr-4 text-[#f5f5f5] placeholder-[#b3b3b3] focus:outline-none focus:border-[#d6a354] transition-colors"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#d6a354] text-[#0b0b0b] font-bold py-3 rounded-sm flex items-center justify-center gap-2 group transition-all"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
              {!loading && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </motion.button>

            {/* Register Link */}
            <p className="text-center text-[#b3b3b3] text-sm mt-6">
              Don't have an account?{' '}
              <Link
                to={`/register?redirect=${encodeURIComponent(redirect)}`}
                className="text-[#d6a354] hover:underline font-medium"
              >
                Register
              </Link>
            </p>
          </motion.form>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <div className="text-xl font-bold text-[#f5f5f5]">50K+</div>
              <div className="text-xs text-[#b3b3b3]">Customers</div>
            </div>
            <div className="w-px bg-[#2a2a2a]" />
            <div className="text-center">
              <div className="text-xl font-bold text-[#f5f5f5]">4.9★</div>
              <div className="text-xs text-[#b3b3b3]">Rating</div>
            </div>
            <div className="w-px bg-[#2a2a2a]" />
            <div className="text-center">
              <div className="text-xl font-bold text-[#f5f5f5]">10K+</div>
              <div className="text-xs text-[#b3b3b3]">Products</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Animated Brand Section */}
      <div className="hidden md:flex w-1/2 bg-[#141414] border-l border-[#2a2a2a] items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(214, 163, 84, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(214, 163, 84, 0.5) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Gradient Orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d6a354]/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.position}`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
            transition={{ delay: item.delay, duration: 1, type: 'spring' }}
          >
            <motion.div
              className={`${item.size} text-[#d6a354]`}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
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
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <h2 className="text-6xl font-bold text-[#f5f5f5] mb-4">
              Drip<span className="text-[#d6a354]">Nest</span>
            </h2>
            <div className="w-32 h-[2px] bg-[#d6a354] mx-auto mb-6" />
            <p className="text-[#b3b3b3] text-lg max-w-md mx-auto leading-relaxed">
              Discover premium fashion that defines your style
            </p>
          </motion.div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Free Shipping', 'Secure Payments', '24/7 Support'].map(
              (feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                  className="bg-[#0b0b0b] border border-[#2a2a2a] px-4 py-2 rounded-sm text-xs text-[#b3b3b3]"
                >
                  {feature}
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

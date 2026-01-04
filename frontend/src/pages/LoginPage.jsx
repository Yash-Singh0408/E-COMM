import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles, ShoppingBag, Star } from 'lucide-react';
import { loginUser, clearAuthError } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';
import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading, error } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';
  const isCheckOutRedirect = redirect.includes('checkout');

  // 🔔 Show backend error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  // ✅ Successful login
  useEffect(() => {
    if (user) {
      toast.success('Login successful 🎉');

      if (cart?.products?.length > 0 && guestId) {
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

    if (!email || !password) {
      toast.warning('Please enter email and password');
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  const floatingIcons = [
    { Icon: ShoppingBag, position: 'top-20 left-1/4', size: 'w-16 h-16', delay: 0 },
    { Icon: Sparkles, position: 'top-1/3 right-1/4', size: 'w-12 h-12', delay: 0.5 },
    { Icon: Star, position: 'bottom-1/3 left-1/3', size: 'w-14 h-14', delay: 1 },
  ];

  return (
    <div className="flex min-h-screen bg-[#0b0b0b]">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 relative">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[#d6a354]/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#141414] border border-[#2a2a2a] rounded-sm p-8 w-full max-w-md relative z-10"
        >
          <h1 className="text-3xl font-bold text-[#f5f5f5] text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-[#b3b3b3] text-center mb-8">
            Sign in to continue your shopping journey
          </p>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm text-[#f5f5f5] mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#2a2a2a] py-3 pl-11 pr-4 text-[#f5f5f5] rounded-sm"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm text-[#f5f5f5] mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#2a2a2a] py-3 pl-11 pr-4 text-[#f5f5f5] rounded-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#d6a354] text-[#0b0b0b] font-bold py-3 rounded-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </motion.button>

          <p className="text-center text-[#b3b3b3] text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-[#d6a354] hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </motion.form>
      </div>

      {/* RIGHT SIDE (unchanged visuals) */}
      <div className="hidden md:flex w-1/2 bg-[#141414] border-l border-[#2a2a2a] items-center justify-center relative overflow-hidden">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.position}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: item.delay, duration: 1 }}
          >
            <item.Icon className={`${item.size} text-[#d6a354]`} />
          </motion.div>
        ))}

        <h2 className="text-6xl font-bold text-[#f5f5f5]">
          Drip<span className="text-[#d6a354]">Nest</span>
        </h2>
      </div>
    </div>
  );
};

export default LoginPage;

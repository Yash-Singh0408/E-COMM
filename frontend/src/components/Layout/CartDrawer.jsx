import React from "react";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CartContent from "../Cart/CartContent";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  // Calculate total
  const total = cart?.products?.reduce((sum, product) => 
    sum + (product.price * product.quantity), 0
  ) || 0;

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCartDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: drawerOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed top-0 right-0 w-full sm:w-[28rem] md:w-[32rem] h-full bg-[#0b0b0b] shadow-2xl flex flex-col z-50 border-l border-[#2a2a2a]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#d6a354]" />
            <h2 className="text-xl font-bold text-[#f5f5f5]">Your Cart</h2>
            {cart?.products?.length > 0 && (
              <span className="bg-[#d6a354] text-[#0b0b0b] text-xs font-bold px-2 py-1 rounded-sm">
                {cartItemCount}
              </span>
            )}
          </div>
          <motion.button
            onClick={toggleCartDrawer}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-[#b3b3b3] hover:text-[#f5f5f5] hover:bg-[#141414] rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Cart Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {cart && cart?.products?.length > 0 ? (
            <CartContent cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full px-6 text-center"
            >
              <div className="w-20 h-20 bg-[#141414] rounded-full flex items-center justify-center mb-4 border border-[#2a2a2a]">
                <ShoppingBag className="w-10 h-10 text-[#b3b3b3]" />
              </div>
              <h3 className="text-lg font-semibold text-[#f5f5f5] mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-[#b3b3b3] mb-6">
                Add items to get started
              </p>
              <motion.button
                onClick={toggleCartDrawer}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#d6a354] text-[#0b0b0b] px-6 py-3 rounded-sm font-semibold text-sm"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Footer - Sticky */}
        {cart && cart?.products?.length > 0 && (
          <div className="p-6 bg-[#141414] border-t border-[#2a2a2a]">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#2a2a2a]">
              <span className="text-[#b3b3b3] text-sm">Subtotal</span>
              <span className="text-[#f5f5f5] font-bold text-xl">
                {new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD',
                  maximumFractionDigits: 2
                }).format(total)}
              </span>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-[#d6a354]/10 border border-[#d6a354]/20 rounded-sm">
              <div className="w-1 h-1 bg-[#d6a354] rounded-full" />
              <p className="text-xs text-[#b3b3b3]">
                Free shipping on orders over $50
              </p>
            </div>

            {/* Checkout Button */}
            
            <motion.button
              onClick={handleCheckout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#d6a354] text-[#0b0b0b] py-4 rounded-sm font-bold text-base flex items-center justify-center gap-2 group"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
     
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartDrawer;
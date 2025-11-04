import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

const CartContent = ({cart, userId , guestId}) => {
  const dispatch = useDispatch();
  
  // Handle Adding and subtracting to cart
  const handleAddToCart = (productId, delta , quantity, size , color)=>{
    const newQuantity = quantity + delta;
    if(newQuantity >= 1){
      dispatch(updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId,
        userId,
        size,
        color,
      }))
    }
  }

  const handleRemoveFromCart = (productId , size , color)=>{
    dispatch(removeFromCart({
      productId, guestId , userId, size , color
    }))
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {cart.products.map((product, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 mb-4 bg-[#141414] border border-[#2a2a2a] rounded-sm hover:border-[#d6a354]/50 transition-all duration-300"
        >
          {/* Left: Image & Details */}
          <div className="flex items-start gap-4 flex-1 w-full sm:w-auto mb-4 sm:mb-0">
            {/* Product Image */}
            <div className="relative w-24 h-28 flex-shrink-0 rounded-sm overflow-hidden bg-[#0b0b0b] border border-[#2a2a2a]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-[#f5f5f5] font-semibold text-base mb-2 truncate">
                {product.name}
              </h3>
              
              {/* Size & Color */}
              <div className="flex gap-3 mb-3">
                <span className="text-xs text-[#b3b3b3] bg-[#0b0b0b] px-2 py-1 rounded-sm border border-[#2a2a2a]">
                  Size: <span className="text-[#f5f5f5] font-medium">{product.size}</span>
                </span>
                <span className="text-xs text-[#b3b3b3] bg-[#0b0b0b] px-2 py-1 rounded-sm border border-[#2a2a2a]">
                  Color: <span className="text-[#f5f5f5] font-medium">{product.color}</span>
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <motion.button 
                  onClick={()=>handleAddToCart(
                    product.productId,
                    -1,
                    product.quantity,
                    product.size,
                    product.color
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm hover:border-[#d6a354] transition-colors"
                  disabled={product.quantity <= 1}
                >
                  <Minus className="w-4 h-4 text-[#b3b3b3]" />
                </motion.button>
                
                <span className="text-[#f5f5f5] font-medium min-w-[30px] text-center">
                  {product.quantity}
                </span>
                
                <motion.button 
                  onClick={()=>handleAddToCart(
                    product.productId,
                    1,
                    product.quantity,
                    product.size,
                    product.color
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm hover:border-[#d6a354] transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#b3b3b3]" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right: Price & Delete */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 w-full sm:w-auto">
            {/* Price */}
            <p className="text-[#d6a354] font-bold text-lg">
              {new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD',
                maximumFractionDigits: 2
              }).format(product.price * product.quantity)}
            </p>

            {/* Delete Button */}
            <motion.button 
              onClick={()=>handleRemoveFromCart(
                product.productId,
                product.size,
                product.color
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-[#0b0b0b] border border-[#2a2a2a] rounded-sm hover:border-red-500/50 hover:bg-red-500/10 transition-all group"
            >
              <Trash2 className="w-5 h-5 text-[#b3b3b3] group-hover:text-red-500 transition-colors" />
            </motion.button>
          </div>
        </motion.div>
      ))}

      {/* Empty State */}
      {cart.products.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <p className="text-[#b3b3b3] text-lg">Your cart is empty</p>
        </motion.div>
      )}
    </div>
  );
};

export default CartContent;
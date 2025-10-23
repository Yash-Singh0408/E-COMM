import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

const CartContent = ({cart, userId , guestId}) => {
// console.log(cart);
const dispatch = useDispatch();
// Handle Adding and subracting to cart
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
// console.log("CART CONTENT DATA:", cart);


  return (
    <div className="container mx-auto p-4">
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex item-start justify-between py-4 border-b"
        >
          <div className="flex item-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover rounded mr-4"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text:sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>

              <div className="flex items-center mt-2">
                <button onClick={()=>handleAddToCart(
                  product.productId,
                  -1,
                  product.quantity,
                  product.size,
                  product.color
                )} className="border rounded px-2 py-1 text-xl font-bold">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button onClick={()=>handleAddToCart(
                  product.productId,
                  1,
                  product.quantity,
                  product.size,
                  product.color
                )} className="border rounded px-2 py-1 text-xl font-bold">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>{new Intl.NumberFormat('en-India', { style: 'currency', currency: 'INR' }).format(product.price)}</p>
            <button onClick={()=>handleRemoveFromCart(
              product.productId,
              product.size,
              product.color
            )}>
                <RiDeleteBin3Line className="h-6 w-6 text-gray-600 " />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;

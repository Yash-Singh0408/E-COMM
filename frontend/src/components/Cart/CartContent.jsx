import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContent = () => {
  const cartProducts = [
    {
      productId: "1",
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 29.99,
      image: `https://picsum.photos/200?random=${Math.floor(
        Math.random() * 1000
      )}`,
    },
    {
      productId: "2",
      name: "Jeans",
      size: "32",
      color: "Blue",
      quantity: 2,
      price: 49.99,
      image: `https://picsum.photos/200?random=${Math.floor(
        Math.random() * 1000
      )}`,
    },
    {
      productId: "3",
      name: "Sneakers",
      size: "9",
      color: "White",
      quantity: 1,
      price: 89.99,
      image: `https://picsum.photos/200?random=${Math.floor(
        Math.random() * 1000
      )}`,
    },
    {
      productId: "4",
      name: "Hoodie",
      size: "L",
      color: "Black",
      quantity: 1,
      price: 59.99,
      image: `https://picsum.photos/200?random=${Math.floor(
        Math.random() * 1000
      )}`,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {cartProducts.map((product, index) => (
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
                <button className="border rounded px-2 py-1 text-xl font-bold">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-bold">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>{new Intl.NumberFormat('en-India', { style: 'currency', currency: 'INR' }).format(product.price)}</p>
            <button>
                <RiDeleteBin3Line className="h-6 w-6 text-gray-600 " />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;

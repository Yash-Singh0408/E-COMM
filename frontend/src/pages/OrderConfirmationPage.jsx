import React from "react";

const checkout = {
  _id: "1234",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Product 1",
      color: "Red",
      size: "M",
      price: "19.99",
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: "2",
      name: "Product 2",
      color: "Blue",
      size: "L",
      price: "29.99",
      quantity: 2,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  shippingAddress: {
    city: "New York",
    country: "United States",
    address: "123 Main St",
  },
};

const calculateEstimateDelivary = (createdAt) => {
  const orderDate = new Date(createdAt);
  orderDate.setDate(orderDate.getDate() + 7);
  return orderDate.toLocaleDateString();
};

const OrderConfirmationPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank you for your order
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Order Id anf Date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order Id: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimateDelivary(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty : {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/*Payment & Shipping Address */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">PayPal</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <p className="text-gray-500">
                {checkout.shippingAddress.address},{" "}
                {checkout.shippingAddress.city},{" "}<br/>
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "PayPal",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/updateCheckoutToPaidAndCreateOrder/${checkoutId}`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-[var(--color-text-primary)] text-center py-10">Loading...</p>;

  if (error) return <p className="text-[var(--color-error)] text-center py-10">Error: {error}</p>;

  if (!cart || !cart.products || cart.products.length === 0)
    return <p className="text-[var(--color-text-primary)] text-center py-10">Cart is empty</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter bg-[var(--color-bg)] min-h-screen">
      {/* Left Section - Checkout Form */}
      <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 border border-[var(--color-border)]">
        <h2 className="text-2xl uppercase mb-6 text-[var(--color-text-primary)] font-semibold">
          Checkout
        </h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4 text-[var(--color-accent)] font-medium">
            Contact Details
          </h3>
          <div className="mb-4">
            <label className="block text-[var(--color-text-secondary)] mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-3 bg-[var(--color-bg-highlight)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4 mt-6 text-[var(--color-accent)] font-medium">
            Delivery
          </h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[var(--color-text-secondary)] mb-2 text-sm">
                First Name
              </label>
              <input
                type="text"
                value={shippingAddress.firstname}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstname: e.target.value,
                  })
                }
                className="w-full p-3 bg-[var(--color-bg-highlight)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[var(--color-text-secondary)] mb-2 text-sm">
                Last Name
              </label>
              <input
                type="text"
                value={shippingAddress.lastname}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastname: e.target.value,
                  })
                }
                className="w-full p-3 bg-[var(--color-bg-highlight)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[var(--color-text-secondary)] mb-2 text-sm">
              Address
            </label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-3 bg-[var(--color-bg-highlight)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[var(--color-text-secondary)] mb-2 text-sm">
                City
              </label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-3 bg-[var(--color-bg-highlight)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[var(--color-text-secondary)] mb-2 text-sm">
                Postal Code
              </label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-3 bg-[var(--color-bg-highlight)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[var(--color-text-secondary)] mb-2 text-sm">
              Country
            </label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-3 bg-[var(--color-bg-highlight)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[var(--color-text-secondary)] mb-2 text-sm">
              Phone number
            </label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-3 bg-[var(--color-bg-highlight)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-[var(--color-accent)] text-[var(--color-bg)] py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4 text-[var(--color-accent)] font-medium">
                  Pay with PayPal
                </h3>
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(error) => {
                    alert("Payment failed " + error);
                  }}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-[var(--color-bg-secondary)] p-6 rounded-lg border border-[var(--color-border)]">
        <h3 className="text-lg mb-4 text-[var(--color-text-primary)] font-semibold">
          Order Summary
        </h3>
        <div className="border-t border-[var(--color-border)] py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-4 border-b border-[var(--color-border)] last:border-b-0"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4 rounded border border-[var(--color-border)]"
                />
                <div>
                  <h3 className="text-md text-[var(--color-text-primary)] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    Size: {product.size}
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    Color: {product.color}
                  </p>
                </div>
              </div>
              <p className="text-xl text-[var(--color-accent)] font-semibold">
                ${product.price}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-3 mt-6">
          <div className="flex justify-between items-center text-lg">
            <p className="text-[var(--color-text-secondary)]">Subtotal</p>
            <p className="text-[var(--color-text-primary)]">
              ${cart.totalPrice?.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between items-center text-lg">
            <p className="text-[var(--color-text-secondary)]">Shipping</p>
            <p className="text-[var(--color-text-primary)]">$0.00</p>
          </div>
          <div className="flex justify-between items-center text-xl mt-4 pt-4 border-t border-[var(--color-border)]">
            <p className="text-[var(--color-text-primary)] font-semibold">
              Total
            </p>
            <p className="text-[var(--color-accent)] font-bold">
              ${cart.totalPrice?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
import Checkout from "../models/Checkout.model.js";
import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";

//  Create new checkout session
const createNewCheckoutSession = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No checkout items" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });
    console.log(`new checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Update checkout to paid
const updateCheckoutToPaidAndCreateOrder = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json({ message: "Checkout updated to paid" , checkout});
    } else {
      return res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (error) {
    console.error("Error updating checkout to paid and creating order:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//finally ckeckout and convert to and order after payment is successful
const createOrderFromCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Creating final order based on checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      // Mark checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // Delete user's cart after order is placed
      await Cart.findOneAndDelete({
        user: checkout.user,
      });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout is already finalized" });
    } else {
      res
        .status(400)
        .json({ message: "Payment not completed for this checkout" });
    }
  } catch (error) {
    console.error("Error creating order from checkout:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  createNewCheckoutSession,
  updateCheckoutToPaidAndCreateOrder,
  createOrderFromCheckout,
};

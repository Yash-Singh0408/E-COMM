import Order from "../models/Order.model.js";

// Get logged in user orders
const getLoggedinUserOrder = async (req, res) => {
    try {
        // Find orders for authentuicated user
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get order details by Id 
const getOrderDetails = async (req, res) => {
try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    // send full order details 
    res.status(200).json(order);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
}
}

export { getLoggedinUserOrder, getOrderDetails };
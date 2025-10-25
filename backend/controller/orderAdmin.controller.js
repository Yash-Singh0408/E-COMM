import Order from '../models/Order.model.js';

// Get all orders - Admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Update order status eg Delivered Processed - Admin
const updateOrderStatus = async (req, res) => {
    try {
       const order = await Order.findById(req.params.id).populate('user', 'name email');
       if(order){
        order.status = req.body.status || order.status;
        order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
        order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
       }else{
        res.status(404).json({ message: "Order not found" });
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
} 

// Delete order - Admin 
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({ message: "Order removed" });
        }else{
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export { getAllOrders , updateOrderStatus , deleteOrder };
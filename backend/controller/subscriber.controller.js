import SubsciberModel from "../models/Subsciber.model.js";

// Subscribe user
const subscribeUser = async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Check if user already subscribed
        let subscriber = await SubsciberModel.findOne({ email });
        if(subscriber) {
            return res.status(400).json({ message: "Email is already subscribed" });
        }

        // Create new subscriber
        subscriber = new SubsciberModel({ email });
        await subscriber.save();

        res.status(201).json({ message: "Subscribed successfully for newsletter" }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export { subscribeUser };
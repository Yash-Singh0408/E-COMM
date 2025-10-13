import Product from "../models/Product.model.js";

// Get all products - Admin
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});    
    res.json(products);
    } catch (error) {
    res.status(500).json({ message: "Server Error" });
    }
};

export { getAllProducts };
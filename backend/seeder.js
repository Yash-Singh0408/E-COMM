import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.model.js";
import User from "./models/User.model.js";
import products from "./data/product.data.js";
import Cart from "./models/Cart.model.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

// Function to seed the database 
const seedData = async () => {
    try {

        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});
        await Cart.deleteMany({});

        // Create a default admin user
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin",
        });

        // Assign the default user ID to each product
        const userID = createdUser._id; 

        const sampleProducts = products.map((product) => {
            return { ...product, user: userID };
        });

        // Insert the products into the database
        await Product.insertMany(sampleProducts);

        console.log("Data Imported!");
        process.exit();
        
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seedData();
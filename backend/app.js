import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.routes.js";

// Initialize
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

//Port
const port = process.env.PORT || 8000;

// Connection to db
connectDB();

// Test route
app.get("/",(req, res)=>{
    res.send("Hello World");
})

// Api routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);

//listining port
app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));

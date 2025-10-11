import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.routes.js";
import checkoutRoute from "./routes/checkout.route.js";
import orderRoute from "./routes/order.routes.js";
import uploadRoute from "./routes/upload.route.js";
import subscriberRoute from "./routes/subscriber.route.js";

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

// Api routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
app.use("/api", subscriberRoute);

//listining port
app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));

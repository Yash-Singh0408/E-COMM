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
import adminRoute from "./routes/admin.route.js";
import productAdminRoute from "./routes/productAdmin.route.js";
import orderAdminRoute from "./routes/orderAdmin.route.js";
dotenv.config();

// Initialize
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
    origin: [
      "https://e-comm-cz7c.vercel.app", // ✅ your frontend domain
      "http://localhost:5173"           // ✅ optional: allow local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if you use cookies or auth headers
  })
);


//Port
const port = process.env.PORT || 8000;

// Connection to db
connectDB();

// Test toute at home
app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello from Yash");
});

// Api routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
app.use("/api", subscriberRoute);

// Admin routes
app.use("/api/admin", adminRoute)
app.use("/api/admin/products", productAdminRoute);
app.use("/api/admin/orders", orderAdminRoute)


//listining port
app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));

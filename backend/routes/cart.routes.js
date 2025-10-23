import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addGuestUserProduct, deleteProductFromCart, getCartItems, mergeCart, updateProductQuantity } from "../controller/cart.controller.js";

const router = express.Router();

router.get("/get", getCartItems)
router.post("/add", addGuestUserProduct);
router.put("/update", updateProductQuantity);
router.delete("/delete", deleteProductFromCart)
router.post("/merge", protect, mergeCart);


export default router;
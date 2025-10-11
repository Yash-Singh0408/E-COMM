import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createNewCheckoutSession, createOrderFromCheckout, updateCheckoutToPaidAndCreateOrder } from "../controller/checkout.controller.js";

const router = express.Router();

router.post("/createNewCheckout", protect , createNewCheckoutSession )
router.put("/updateCheckoutToPaidAndCreateOrder/:id", protect, updateCheckoutToPaidAndCreateOrder )
router.post("/:id/finalize", protect, createOrderFromCheckout )


export default router;
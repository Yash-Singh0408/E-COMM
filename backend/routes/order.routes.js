import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getLoggedinUserOrder, getOrderDetails } from "../controller/order.controller.js";

const router = express.Router();

router.get("/getOrder", protect, getLoggedinUserOrder);
router.get("/getOrderDetails/:id", protect, getOrderDetails);

export default router;
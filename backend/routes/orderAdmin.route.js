import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { deleteOrder, getAllOrders, updateOrderStatus } from '../controller/orderAdmin.controller.js';
const router = express.Router();

router.get("/getAllOrders",protect, admin , getAllOrders);
router.put("/updateOrderStatus/:id",protect, admin , updateOrderStatus);
router.delete("/deleteOrder/:id",protect, admin , deleteOrder);

export default router;
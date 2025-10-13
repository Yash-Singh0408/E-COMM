import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { getAllProducts } from "../controller/productAdmin.controller.js";

const router = express.Router();

router.get("/getAllProducts",protect, admin , getAllProducts);

export default router;
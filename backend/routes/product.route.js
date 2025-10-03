import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getBestSellingProduct,
  getNewArrivals,
  getProduct,
  getProducts,
  getSimilarProducts,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/addProduct", protect, admin, createProduct);
router.put("/updateProduct/:id", protect, admin, updateProduct);
router.delete("/deleteProduct/:id", protect, admin, deleteProduct);
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);
router.get("/getSimilarProducts/:id", getSimilarProducts);
router.get("/getBestSellingProduct", getBestSellingProduct);
router.get("/getNewArrivals", getNewArrivals);

export default router;

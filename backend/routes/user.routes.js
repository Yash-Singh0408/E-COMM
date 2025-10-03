import express from "express";
import { getProfileInfo, loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Routes for user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfileInfo)
router.post("/logout",logoutUser);



export default router;

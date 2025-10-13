import express from "express";
import { admin , protect } from "../middleware/authMiddleware.js";
import { createUser, deleteUser, getUsers, updateUser } from "../controller/admin.controller.js";
const router = express.Router();

router.get("/getUsers", protect, admin , getUsers)
router.post("/createUser", protect, admin , createUser)
router.put("/updateUser/:id", protect, admin , updateUser)
router.delete("/deleteUser/:id", protect, admin , deleteUser) 



export default router;
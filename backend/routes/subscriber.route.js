import express from "express";
import { subscribeUser } from "../controller/subscriber.controller.js";

const router = express.Router();

router.post("/subscribe", subscribeUser )

export default router;
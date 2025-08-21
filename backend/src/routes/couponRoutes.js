import express from "express";
import { applyCoupon, createCoupon } from "../controllers/couponController.js";

const router = express.Router();

// Create coupon (Admin only ideally)
router.post("/", createCoupon);

// Apply coupon
router.post("/apply", applyCoupon);

export default router;

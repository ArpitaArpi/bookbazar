import express from 'express';
import { getAdminStats } from '../controllers/adminController.js';
const router = express.Router();

// Admin stats route
router.get("/", getAdminStats);

export default router;

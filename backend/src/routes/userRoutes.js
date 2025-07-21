import express from 'express';
import { login, registerUser, adminLogin, registerAdmin } from '../controllers/userController.js';
const router = express.Router();

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", login);

// Admin routes
router.post("/admin", adminLogin);
router.post("/admin/register", registerAdmin);

export default router;

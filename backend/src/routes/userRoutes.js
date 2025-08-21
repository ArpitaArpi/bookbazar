import express from 'express';
import { adminLogin, login, registerAdmin, registerUser } from '../controllers/userController.js';

const router = express.Router();

// User routes
router.post("/register", registerUser);      
router.post("/login", login);                 

// Admin routes
router.post("/admin/register", registerAdmin); 
router.post("/admin/login", adminLogin);      

export default router;

import express from "express";
import userRoutes from './users'; 
import authRoutes from './auth'; 

const router = express.Router();
router.use('/api/v1', userRoutes);
router.use('/api/v1', authRoutes);

export default router;

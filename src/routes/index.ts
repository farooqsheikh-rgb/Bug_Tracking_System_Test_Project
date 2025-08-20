import express from "express";
import userRoutes from "./users";
import authRoutes from "./auth";
import projectRoutes from "./projects";

const router = express.Router();
router.use("/api/v1", userRoutes);
router.use("/api/v1", authRoutes);
router.use("/api/v1", projectRoutes);

export default router;

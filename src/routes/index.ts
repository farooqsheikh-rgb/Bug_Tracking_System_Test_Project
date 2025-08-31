import express from "express";
import authRoutes from "./auth";
import projectRoutes from "./projects";
import bugRoutes from "./bugs";
import userRoutes from "./users";

const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/projects", projectRoutes);
router.use("/api/v1/bugs", bugRoutes);
router.use("/api/v1/users", userRoutes);

export default router;

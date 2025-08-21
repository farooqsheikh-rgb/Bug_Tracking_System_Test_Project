import express from "express";
import userRoutes from "./users";
import authRoutes from "./auth";
import projectRoutes from "./projects";
import assignUsersRoutes from "./assignUsers";
import bugRoutes from "./bugs";
import assignBugsRoutes from "./assignBugs";

const router = express.Router();
router.use("/api/v1", userRoutes);
router.use("/api/v1", authRoutes);
router.use("/api/v1", projectRoutes);
router.use("/api/v1", assignUsersRoutes);
router.use("/api/v1", bugRoutes);
router.use("/api/v1", assignBugsRoutes);

export default router;

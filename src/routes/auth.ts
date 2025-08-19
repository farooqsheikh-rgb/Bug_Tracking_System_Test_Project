import { Router } from "express";
const router = Router();
const AUTH_ROUTES_PREFIX = "/auth";

router.get(`/auth/signup`, (req, res) => {
  res.json({ message: "signup" });
});

export default router;

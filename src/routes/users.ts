import { Router } from "express";
const router = Router();
const USER_ROUTES_PREFIX = "/user";

router.get(`/user`, (req, res) => {
  res.json({ message: "Users" });
});

export default router;

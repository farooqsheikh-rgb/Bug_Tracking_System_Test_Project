import { Router } from "express";
import AuthController from "../app/auth/AuthController";
const router = Router();

router.post("/auth/signup", AuthController.signup);
router.post("/auth/signin", AuthController.signin);
export default router;

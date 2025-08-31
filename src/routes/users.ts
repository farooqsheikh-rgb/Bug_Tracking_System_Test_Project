import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import UserController from "../app/user/UserController";

const router = Router();

router.use(Authentication.authenticate);

router.get(
  "/",
  Authentication.hasRole("manager"),
  UserController.getAllUsers
);

export default router;

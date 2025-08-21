import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import User from "../models/user";
import UserController from "../app/user/UserController";
const router = Router();

router.get('/user', Authentication.authenticate, UserController.getTheUsers);

export default router;

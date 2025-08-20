import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import ProjectController from "../app/project/ProjectController";
const router = Router();

router.post("/project/addNew", Authentication.authenticateManager,ProjectController.addNew);
export default router;

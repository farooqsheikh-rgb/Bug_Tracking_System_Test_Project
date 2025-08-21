import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import ProjectController from "../app/project/ProjectController";
const router = Router();

router.post("/project/addNew", Authentication.authenticateManager,ProjectController.addNew);
router.get("/project/getProjects", Authentication.authenticateManager,ProjectController.getProjects);
router.get("/project/getProject/:id", Authentication.authenticateManager,ProjectController.getProject);
router.get("/project/searchProject/:name", Authentication.authenticateManager,ProjectController.searchProject);
router.delete("/project/deleteProject/:id", Authentication.authenticateManager,ProjectController.deleteProject);

export default router;

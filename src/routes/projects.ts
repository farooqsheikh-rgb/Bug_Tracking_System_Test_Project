import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import ProjectController from "../app/project/ProjectController";

const router = Router();

router.use(Authentication.authenticate, Authentication.hasRole('manager'));

router.post(
  "/",
  ProjectController.createProject
);

router.get(
  "/",
  ProjectController.getAllProjects
);

router.get(
  "/:id",
  ProjectController.getProjectById
);

router.get(
  "/search/:name",
  ProjectController.searchProjectsByName
);

router.delete(
  "/:id",
  ProjectController.deleteProjectById
);

router.post(
  "/:projectId/members",
  ProjectController.addProjectMembers
);

router.get(
  "/:projectId/members",
  ProjectController.getProjectMembers
);

export default router;

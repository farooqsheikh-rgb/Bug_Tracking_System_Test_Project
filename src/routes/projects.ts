import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import ProjectController from "../app/project/ProjectController";

const router = Router();

router.use(Authentication.authenticate);

router.post(
  "/", 
  Authentication.hasRole('manager'),
  ProjectController.createProject
);

router.get(
  "/", 
  Authentication.hasAnyRole(['manager', 'developer', 'QA']),
  ProjectController.getAllProjects
);

router.get(
  "/search",
  Authentication.hasAnyRole(['manager', 'developer', 'QA']),
  ProjectController.searchProjectsByName
);

router.get(
  "/search/:name",
  Authentication.hasAnyRole(['manager', 'developer', 'QA']),
  ProjectController.searchProjectsByName
);

router.get(
  "/:id",
  ProjectController.getProjectById
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

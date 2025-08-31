import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import BugController from "../app/bug/BugController";
import { upload } from "../helpers/upload";
import Permissions from "../middlewares/Permissions";

const router = Router();

router.use(Authentication.authenticate);

router.post(
  "/",
  Authentication.hasRole("QA"),
  upload.single("screenshot"),
  BugController.createBug
);

router.get(
  "/",
  Authentication.hasAnyRole(["manager", "QA", "developer"]),
  Permissions.checkPermissionForBugs,
  BugController.getAllBugsByQA
);

router.get(
  "/:id",
  Authentication.hasAnyRole(["manager", "QA"]),
  Permissions.checkPermission,
  BugController.getBugById
);

router.get(
  "/search/:title",
  Authentication.hasAnyRole(["manager", "QA"]),
  Permissions.checkPermission,
  BugController.findBugByTitle
);

router.delete(
  "/:bugId",
  Authentication.hasAnyRole(["manager", "QA"]),
  BugController.deleteBugById
);

router.post(
  "/:bugId/assignee",
  Authentication.hasAnyRole(["manager", "QA"]),
  Permissions.checkPermission,
  BugController.assignBugToDeveloper
);

router.get(
  "/:bugId/assignee",
  Authentication.hasAnyRole(["manager", "QA"]),
  Permissions.checkPermission,
  BugController.getBugAssignee
);

router.get(
  "/:bugId/assignee",
  Authentication.hasAnyRole(["manager", "QA"]),
  Permissions.checkPermission,
  BugController.getBugAssignee
);

router.patch(
  "/:bugId/status",
  Authentication.hasRole("developer"),
  BugController.updateBugStatus
);

router.get(
  "/project/:projectId",
  Authentication.hasAnyRole(["manager", "QA", "developer"]),
  BugController.getBugsByProject
);

export default router;

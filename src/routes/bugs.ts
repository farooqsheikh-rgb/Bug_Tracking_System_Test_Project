import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import BugController from "../app/bug/BugController";

const router = Router();

router.use(Authentication.authenticate);

router.post("/", Authentication.hasRole("QA"), BugController.createBug);

router.get(
  "/",
  Authentication.hasAnyRole(["manager", "QA"]),
  BugController.getAllBugsByQA
);

router.get(
  "/:id",
  Authentication.hasAnyRole(["manager", "QA"]),
  BugController.getBugById
);

router.get(
  "/search/:title",
  Authentication.hasAnyRole(["manager", "QA"]),
  BugController.findBugByTitle
);

router.delete(
  "/:id",
  Authentication.hasRole("QA"),
  BugController.deleteBugById
);

router.post(
  "/:bugId/assignee",
  Authentication.hasAnyRole(["manager", "QA"]),
  BugController.assignBugToDeveloper
);

router.get(
  "/:bugId/assignee",
  Authentication.hasAnyRole(["manager", "QA"]),
  BugController.getBugAssignee
);

export default router;

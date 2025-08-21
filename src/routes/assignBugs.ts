import { Router } from "express";
import Authentication from "../middlewares/Authentication";
import AssignBugsController from "../app/assignBugs/AssignBugsController";

const router = Router();

router.post("/bug/assign-bugs", Authentication.authenticateManagerAndQA,AssignBugsController.assignBugs);
router.get("/bug/assigned-bugs/:bugId", Authentication.authenticateQA, AssignBugsController.getAssignedBugs);
router.get("/bug/assign-bugs-by-manager", Authentication.authenticateManager, AssignBugsController.assignBugsManager);

export default router;




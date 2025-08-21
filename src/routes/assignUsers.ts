import { Router } from "express";
import AssignUsersController from "../app/assignUsers/AssignUsersController";
import Authentication from "../middlewares/Authentication";

const router = Router();

router.post("/project/assign-users", Authentication.authenticateManager,AssignUsersController.assignUsers);
router.get("/project/assigned-users/:projectId", Authentication.authenticateManager, AssignUsersController.getAssignedUsers);

export default router;

import { Router } from "express"
import Authentication from "../middlewares/Authentication";
import BugController from "../app/bug/BugController";

const router = Router();
router.post("/bugs", Authentication.authenticateQA,BugController.addNew);

router.post("/bug/addNew", Authentication.authenticateQA,BugController.addNew);
router.get("/bug/getbugs", Authentication.authenticateQA,BugController.getBugs);
router.get("/bug/getbug/:id", Authentication.authenticateQA,BugController.getBug);
router.get("/bug/searchbug/:name", Authentication.authenticateQA,BugController.searchBug);
router.delete("/bug/deletebug/:id", Authentication.authenticateManager,BugController.deleteBug);


export default router;
import { Request, Response } from "express";
import AssignBugsManager from "./AssignBugsManager";

class AssignBugsController {
  static async assignBugs(req: Request, res: Response) {
    try {
      const user = req.user;

      const { bugId, userId } = req.body;

      if (!user?.id || !bugId || !userId) {
        return res.status(400).json({ error: "Invalid request!" });
      }

      const result = await AssignBugsManager.assignBugs(
        user.id,
        bugId,
        userId
      );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async assignBugsManager(req: Request, res: Response) {
    try {
      const user = req.user;

      const { bugId, userId } = req.body;

      if (!user?.id || !bugId || !userId) {
        return res.status(400).json({ error: "Invalid request!" });
      }

      const result = await AssignBugsManager.assignBugsManager(
        user.id,
        bugId,
        userId
      );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAssignedBugs(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const bugId = Number(req.params.bugId);
      
      if (!bugId || !userId) {
        return res
          .status(400)
          .json({ error: "Missing bugId or userId." });
      }

      const assignedBugs = await AssignBugsManager.getAssignedBugs(
        userId,
        userId
      );

      res.status(200).json({ users: assignedBugs });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default AssignBugsController;

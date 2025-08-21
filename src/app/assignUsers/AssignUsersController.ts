import { Request, Response } from "express";
import AssignUsersManager from "./AssignUsersManager";

class AssignUsersController {
  static async assignUsers(req: Request, res: Response) {
    try {
      const manager = req.user;

      const { projectId, userIds } = req.body;

      if (!manager?.id || !projectId || !Array.isArray(userIds)) {
        return res.status(400).json({ error: "Invalid request!" });
      }

      const result = await AssignUsersManager.assignUsers(
        manager.id,
        projectId,
        userIds
      );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAssignedUsers(req: Request, res: Response) {
    try {
      const managerId = req.user?.id;
      const projectId = Number(req.params.projectId);
      
      if (!projectId || !managerId) {
        return res
          .status(400)
          .json({ error: "Missing projectId or managerId." });
      }

      const assignedUsers = await AssignUsersManager.getAssignedUsers(
        projectId,
        managerId
      );

      res.status(200).json({ users: assignedUsers });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default AssignUsersController;

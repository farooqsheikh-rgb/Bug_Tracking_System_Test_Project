import { Request, Response } from "express";
import BugManager from "./BugManager";

class BugController {
  static async createBug(req: Request, res: Response) {
    try {
      const user = req.user;
      const {
        title,
        description,
        deadline,
        screenshot,
        type,
        status,
        project_id,
      } = req.body;
      const bug = await BugManager.createBug(
        title,
        description,
        deadline,
        screenshot,
        type,
        status,
        project_id,
        user?.id!
      );

      return res.json({
        success: true,
        data: bug,
      });
    } catch (err) {
      console.error(
        `Adding Bug:: Request to add bug failed. data:: `,
        req.body,
        err
      );

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async getAllBugsByQA(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugs = await BugManager.getAllBugsByQA(user?.id!);

      return res.json({
        success: true,
        data: bugs,
      });
    } catch (err) {
      console.error(`Get Bugs:: Request to get bugs failed.`, err);

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async getBugById(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugIdParam = req.params.id;
      if (!bugIdParam) {
        return res.status(400).json({ message: "Project ID is required" });
      }
      const bugId = parseInt(bugIdParam);
      if (isNaN(bugId)) {
        return res.status(400).json({ message: "Project ID must be a number" });
      }
      const bug = await BugManager.getBugById(user?.id!, bugId);

      return res.json({
        success: true,
        data: bug,
      });
    } catch (err) {
      console.error(`Get Project:: Request to get project failed.`, err);

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async findBugByTitle(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugName = req.params.title;
      if (!bugName) {
        return res.status(400).json({ message: "Bug Name is required" });
      }

      const bug = await BugManager.findBugByName(user?.id!, bugName);

      return res.json({
        success: true,
        data: bug,
      });
    } catch (err) {
      console.error(`Get Bug:: Request to get bug failed.`, err);

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async deleteBugById(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugIdParam = req.params.id;
      if (!bugIdParam) {
        return res.status(400).json({ message: "Bug ID is required" });
      }
      const bugId = parseInt(bugIdParam);
      if (isNaN(bugId)) {
        return res.status(400).json({ message: "Project ID must be a number" });
      }
      const bug = await BugManager.deleteBugById(user?.id!, bugId);

      return res.json({
        success: true,
        data: bug,
      });
    } catch (err) {
      console.error(`Delete Bug:: Request to delete bug failed.`, err);

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async assignBugToDeveloper(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugId = req.params.bugId;

      const { userId } = req.body;

      if (!user?.id || !bugId || !userId) {
        return res.status(400).json({ error: "Invalid request!" });
      }

      const result = await BugManager.assignBugToDeveloper(
        user.id,
        Number(bugId),
        userId
      );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBugAssignee(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const bugId = Number(req.params.bugId);

      if (!bugId || !userId) {
        return res.status(400).json({ error: "Missing bugId or userId." });
      }

      const assignedBugs = await BugManager.getBugAssignee(userId, userId);

      res.status(200).json({ users: assignedBugs });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default BugController;

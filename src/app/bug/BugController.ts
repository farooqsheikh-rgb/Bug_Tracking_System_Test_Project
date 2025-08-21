import { Request, Response } from "express";
import BugManager from "./BugManager";

class BugController {
  static async addNew(req: Request, res: Response) {
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
      const bug = await BugManager.addNew(
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

  static async getBugs(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugs = await BugManager.getBugs(user?.id!);

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

  static async getBug(req: Request, res: Response) {
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
      const bug = await BugManager.getBug(user?.id!, bugId);

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

  static async searchBug(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugName = req.params.name;
      if (!bugName) {
        return res.status(400).json({ message: "Bug Name is required" });
      }

      const bug = await BugManager.searchBug(user?.id!, bugName);

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

  static async deleteBug(req: Request, res: Response) {
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
      const bug = await BugManager.deleteBug(user?.id!, bugId);

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
}

export default BugController;

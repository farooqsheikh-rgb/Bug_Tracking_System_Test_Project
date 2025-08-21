import { Request, Response } from "express";
import ProjectManager from "./ProjectManager";
import { Validators } from "../../helpers/validator";

class ProjectController {
  static async addNew(req: Request, res: Response) {
    try {
      const user = req.user;
      const { name } = req.body;
      const project = await ProjectManager.addNew(name, user?.id!);

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(
        `Adding Project:: Request to add project failed. data:: `,
        req.body,
        err
      );

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async getProjects(req: Request, res: Response) {
    try {
      const user = req.user;
      const projects = await ProjectManager.getProjects(user?.id!);

      return res.json({
        success: true,
        data: projects,
      });
    } catch (err) {
      console.error(
        `Get Projects:: Request to get projects failed.`,
        err
      );

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async getProject(req: Request, res: Response) {
    try {
      const user = req.user;
      const projectIdParam = req.params.id;
       if (!projectIdParam) {
        return res.status(400).json({ message: "Project ID is required" });
      }
      const projectId = parseInt(projectIdParam);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Project ID must be a number" });
      }
      const project = await ProjectManager.getProject(user?.id!,projectId);

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(
        `Get Project:: Request to get project failed.`,
        err
      );

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async searchProject(req: Request, res: Response) {
    try {
      const user = req.user;
      const projectName = req.params.name;
      if (!projectName) {
        return res.status(400).json({ message: "Project Name is required" });
      }

      const project = await ProjectManager.searchProject(user?.id!,projectName);

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(
        `Get Project:: Request to get project failed.`,
        err
      );

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async deleteProject(req: Request, res: Response) {
    try {
      const user = req.user;
      const projectIdParam = req.params.id;
       if (!projectIdParam) {
        return res.status(400).json({ message: "Project ID is required" });
      }
      const projectId = parseInt(projectIdParam);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Project ID must be a number" });
      }
      const project = await ProjectManager.deleteProject(user?.id!,projectId);

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(
        `Delete Project:: Request to delete project failed.`,
        err
      );

      return res.status(500).json({
        success: false,
      });
    }
  }
}

export default ProjectController;

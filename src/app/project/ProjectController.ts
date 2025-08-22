import { Request, Response } from "express";
import ProjectManager from "./ProjectManager";

class ProjectController {
  static async createProject(req: Request, res: Response) {
    try {
      const user = req.user;
      const { name } = req.body;
      const project = await ProjectManager.createProject(name, user?.id!);

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

  static async getAllProjects(req: Request, res: Response) {
    try {
      const user = req.user;
      const projects = await ProjectManager.listProjectsByManager(user?.id!);

      return res.json({
        success: true,
        data: projects,
      });
    } catch (err) {
      console.error(`Get Projects:: Request to get projects failed.`, err);

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async getProjectById(req: Request, res: Response) {
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
      const project = await ProjectManager.getProjectById(user?.id!, projectId);

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(`Get Project:: Request to get project failed.`, err);

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async searchProjectsByName(req: Request, res: Response) {
    try {
      const user = req.user;
      const projectName = req.params.name;
      if (!projectName) {
        return res.status(400).json({ message: "Project Name is required" });
      }

      const project = await ProjectManager.findProjectByName(
        user?.id!,
        projectName
      );

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(`Get Project:: Request to get project failed.`, err);

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async deleteProjectById(req: Request, res: Response) {
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
      const project = await ProjectManager.deleteProjectById(user?.id!, projectId);

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(`Delete Project:: Request to delete project failed.`, err);

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async addProjectMembers(req: Request, res: Response) {
    try {
      const manager = req.user;
      const projectId = req.params.projectId;
      const { userIds } = req.body;

      if (!manager?.id || !projectId || !Array.isArray(userIds)) {
        return res.status(400).json({ error: "Invalid request!" });
      }

      const result = await ProjectManager.assignMembersToProject(
        manager.id,
        Number(projectId),
        userIds
      );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProjectMembers(req: Request, res: Response) {
    try {
      const managerId = req.user?.id;
      const projectId = Number(req.params.projectId);

      if (!projectId || !managerId) {
        return res
          .status(400)
          .json({ error: "Missing projectId or managerId." });
      }

      const assignedUsers = await ProjectManager.listProjectMembers(
        projectId,
        managerId
      );

      res.status(200).json({ users: assignedUsers });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProjectController;

import { Request, Response } from "express";
import ProjectManager from "./ProjectManager";
import Validators from "../../helpers/validator";
import { ErrorCodes } from "../../constants/ErrorCodes";
import { ProjectConstants } from "../../constants/Project";
import Exception from "../../helpers/Exception";

class ProjectController {
  static async createProject(req: Request, res: Response) {
    try {
      const user = req.user;
      const { name, description } = req.body;
      const project = await ProjectManager.createProject(name, description, user?.id);

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(`Adding Project:: Request to add project failed. data:: `, req.body, err);
      
      const appError = err as Exception;

      return res
        .status(
          Validators.validateCode(
            appError.code ?? ErrorCodes.INTERNAL_SERVER_ERROR,
            ErrorCodes.INTERNAL_SERVER_ERROR
          )
        )
        .json({
          success: false,
          message: appError.reportError
            ? appError.message
            : ProjectConstants.MESSAGES.CREATE_PROJECT_FAILED,
        });
    }
  }

  static async getAllProjects(req: Request, res: Response) {
    try {
      const user = req.user;
      const { sort = 'name', order = 'asc', page = 1, limit = 9 } = req.query;
      
      const pageNumber = Math.max(1, parseInt(page as string) || 1);
      const pageSize = Math.min(50, Math.max(1, parseInt(limit as string) || 9));
      const offset = (pageNumber - 1) * pageSize;
      
      const validSortFields = ['name', 'created_at', 'updated_at'];
      const validOrderValues = ['asc', 'desc'];
      
      const sortField = validSortFields.includes(sort as string) ? sort as string : 'name';
      const sortOrder = validOrderValues.includes((order as string).toLowerCase()) ? (order as string).toLowerCase() : 'asc';

      const projects = await ProjectManager.listProjectsByManager(user!, {
        sortField,
        sortOrder,
        page: pageNumber,
        limit: pageSize,
        offset
      });

      return res.json({
        success: true,
        data: projects.projects,
        pagination: {
          currentPage: pageNumber,
          totalPages: Math.ceil(projects.total / pageSize),
          totalItems: projects.total,
          itemsPerPage: pageSize,
          hasNextPage: pageNumber < Math.ceil(projects.total / pageSize),
          hasPrevPage: pageNumber > 1
        }
      });
    } catch (err) {
      console.error(`Get Projects:: Request to get projects failed.`, err);

      const appError = err as Exception;

      return res
        .status(
          Validators.validateCode(
            appError.code ?? ErrorCodes.INTERNAL_SERVER_ERROR,
            ErrorCodes.INTERNAL_SERVER_ERROR
          )
        )
        .json({
          success: false,
          message: appError.reportError
            ? appError.message
            : ProjectConstants.MESSAGES.FETCH_PROJECTS_FAILED,
        });
    }
  }

  static async getProjectById(req: Request, res: Response) {
    try {
      const user = req.user;
      const projectIdParam = Number(req.params.id);
      const project = await ProjectManager.getProjectById(projectIdParam,user?.id);

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(`Get Project:: Request to get project failed.`, err);

      const appError = err as Exception;

      return res
        .status(
          Validators.validateCode(
            appError.code ?? ErrorCodes.INTERNAL_SERVER_ERROR,
            ErrorCodes.INTERNAL_SERVER_ERROR
          )
        )
        .json({
          success: false,
          message: appError.reportError
            ? appError.message
            : ProjectConstants.MESSAGES.GET_PROJECT_BY_ID_FAILED,
        });
    }
  }

  static async searchProjectsByName(req: Request, res: Response) {
    try {
      const user = req.user;
      const projectName = req.params.name || req.query.name as string;

      if (!projectName || projectName.trim() === '') {
        return res.json({
          success: true,
          data: [],
        });
      }

      const projects = await ProjectManager.findProjectByName(
        projectName.trim(), 
        user?.id, 
        user?.user_type
      );

      return res.json({
        success: true,
        data: projects,
      });
    } catch (err) {
      console.error(`Search Project:: Request to search projects failed.`, err);

      const appError = err as Exception;

      return res
        .status(
          Validators.validateCode(
            appError.code ?? ErrorCodes.INTERNAL_SERVER_ERROR,
            ErrorCodes.INTERNAL_SERVER_ERROR
          )
        )
        .json({
          success: false,
          message: appError.reportError
            ? appError.message
            : ProjectConstants.MESSAGES.SEARCH_PROJECT_BY_NAME_FAILED,
        });
    }
  }

  static async deleteProjectById(req: Request, res: Response) {
    try {
      const user = req.user;
      const projectIdParam = Number(req.params.id);
      const project = await ProjectManager.deleteProjectById(projectIdParam, user?.id);

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(`Delete Project:: Request to delete project failed.`, err);

      const appError = err as Exception;

      return res
        .status(
          Validators.validateCode(
            appError.code ?? ErrorCodes.INTERNAL_SERVER_ERROR,
            ErrorCodes.INTERNAL_SERVER_ERROR
          )
        )
        .json({
          success: false,
          message: appError.reportError
            ? appError.message
            : ProjectConstants.MESSAGES.DELETE_PROJECT_FAILED,
        });
    }
  }

  static async addProjectMembers(req: Request, res: Response) {
    try {
      const manager = req.user;
      const projectId = Number(req.params.projectId);
      const { userIds } = req.body;

      const result = await ProjectManager.assignMembersToProject(
        Number(projectId),
        userIds,
        manager?.id,
        
      );

      return res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      console.error(`Add Project Members:: Request to add project members failed.`, err);

      const appError = err as Exception;

      return res
        .status(
          Validators.validateCode(
            appError.code ?? ErrorCodes.INTERNAL_SERVER_ERROR,
            ErrorCodes.INTERNAL_SERVER_ERROR
          )
        )
        .json({
          success: false,
          message: appError.reportError
            ? appError.message
            : ProjectConstants.MESSAGES.ADD_PROJECT_MEMBERS_FAILED,
        });
    }
  }

  static async getProjectMembers(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);

      const assignedUsers = await ProjectManager.listProjectMembers(projectId);

      return res.json({
        success: true,
        data: assignedUsers,
      });    
    } catch (err) {
      console.error(`Get Project Members:: Request to get project members failed.`, err);

      const appError = err as Exception;

      return res
        .status(
          Validators.validateCode(
            appError.code ?? ErrorCodes.INTERNAL_SERVER_ERROR,
            ErrorCodes.INTERNAL_SERVER_ERROR
          )
        )
        .json({
          success: false,
          message: appError.reportError
            ? appError.message
            : ProjectConstants.MESSAGES.GET_PROJECT_MEMBERS_FAILED,
        });
    }
  }
}

export default ProjectController;

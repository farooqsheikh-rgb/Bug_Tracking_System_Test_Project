import { Request, Response } from "express";
import BugManager from "./BugManager";
import Validators from "../../helpers/validator";
import { ErrorCodes, BugConstants } from "../../constants";
import Exception from "../../helpers/Exception";

class BugController {
  static async createBug(req: Request, res: Response) {
    try {
      const user = req.user;
      const screenshot = req.file?.filename;

      const bugPayload = {
        ...req.body,
        screenshot,
      };

      const bug = await BugManager.createBug(bugPayload, user?.id);

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
            : BugConstants.MESSAGES.CREATE_BUG_FAILED,
        });
    }
  }

  static async getAllBugsByQA(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugs = await BugManager.getAllBugsByQA(user?.id);

      return res.json({
        success: true,
        data: bugs,
      });
    } catch (err) {
      console.error(`Get Bugs:: Request to get bugs failed.`, err);

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
            : BugConstants.MESSAGES.FETCH_BUGS_FAILED,
        });
    }
  }

  static async getBugById(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugIdParam = Number(req.params.id);

      const bug = await BugManager.getBugById(user?.id, bugIdParam);

      return res.json({
        success: true,
        data: bug,
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
            : BugConstants.MESSAGES.GET_BUG_BY_ID_FAILED,
        });
    }
  }

  static async findBugByTitle(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugName = req.params.title;

      const bug = await BugManager.findBugByName(bugName, user?.id);

      return res.json({
        success: true,
        data: bug,
      });
    } catch (err) {
      console.error(`Get Bug:: Request to get bug failed.`, err);

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
            : BugConstants.MESSAGES.FIND_BUG_BY_TITLE_FAILED,
        });
    }
  }

  static async deleteBugById(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugIdParam = Number(req.params.bugId);

      const bug = await BugManager.deleteBugById(user?.id, bugIdParam);

      return res.json({
        success: true,
        data: bug,
      });
    } catch (err) {
      console.error(`Delete Bug:: Request to delete bug failed.`, err);

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
            : BugConstants.MESSAGES.DELETE_BUG_FAILED,
        });
    }
  }

  static async assignBugToDeveloper(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugId = Number(req.params.bugId);
      const { userId } = req.body;
      const result = await BugManager.assignBugToDeveloper(
        bugId,
        Number(userId),
        user?.id
      );

      return res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      console.error(
        `Assign Bug To Developer:: Request to assign bug to developer failed.`,
        err
      );

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
            : BugConstants.MESSAGES.ASSIGN_BUG_TO_DEVELOPER_FAILED,
        });
    }
  }

  static async getBugAssignee(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const bugId = Number(req.params.bugId);

      const assignedBugs = await BugManager.getBugAssignee(bugId, userId);

      return res.json({
        success: true,
        data: assignedBugs,
      });
    } catch (err) {
      console.error(
        `Get Bug Assignee:: Request to get bug assignee failed.`,
        err
      );

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
            : BugConstants.MESSAGES.GET_BUG_ASSIGNEES_FAILED,
        });
    }
  }

  static async updateBugStatus(req: Request, res: Response) {
    try {
      const user = req.user;
      const bugIdParam = Number(req.params.bugId);
      const { status } = req.body;

      const updatedBug = await BugManager.updateBugStatus(
        bugIdParam,
        status,
        user?.id
      );

      return res.json({
        success: true,
        data: updatedBug,
      });
    } catch (err) {
      console.error(`Update Bug:: Request to update bug failed.`, err);

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
            : BugConstants.MESSAGES.UPDATE_BUG_FAILED,
        });
    }
  }

  static async getBugsByProject(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const user = req.user;
      
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const title = req.query.title as string || '';
      
      const offset = (page - 1) * limit;

      const bugs = await BugManager.getBugsByProject(projectId, user!, {
        page,
        limit,
        offset,
        title
      });

      return res.json({
        success: true,
        data: bugs.data,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(bugs.total / limit),
          totalItems: bugs.total,
          itemsPerPage: limit
        }
      });
    } catch (err) {
      console.error(`Get Bugs By Project:: Request to get bugs by project failed.`, err);

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
            : BugConstants.MESSAGES.FETCH_BUGS_FAILED,
        });
    }
  }
}

export default BugController;

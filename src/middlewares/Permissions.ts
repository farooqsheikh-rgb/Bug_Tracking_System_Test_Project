import { Request, Response, NextFunction } from "express";
import { UserInterface } from "../interfaces/users";
import BugHandler from "../handlers/BugHandler";
import ProjectHandler from "../handlers/ProjectHandler";
import { BugConstants, ErrorCodes, UserConstants } from "../constants";
import Exception from "../helpers/Exception";

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
    }
  }
}

class Permissions {
  static async checkPermission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (req.user!.user_type === "manager") {
        const bugId = Number(req.params.bugId);
        const bug = await BugHandler.getBugById(bugId);
        if (!bug) {
          throw new Exception(
            BugConstants.MESSAGES.BUG_NOT_FOUND,
            ErrorCodes.DOCUMENT_NOT_FOUND,
            { reportError: true }
          );
        }
        const projectId = Number(bug.project_id);
        console.log(projectId);
        const checkPermission = await ProjectHandler.fetchProjectById(
          req.user!.id!,
          projectId
        );
        if (!checkPermission) {
          return res.status(ErrorCodes.FORBIDDEN).json({
            message: UserConstants.MESSAGES.UNAUTHORIZED_USER,
          });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(ErrorCodes.UNAUTHORIZED).json({
        message: UserConstants.MESSAGES.INVALID_AUTHENTICATION_TOKEN,
      });
    }

    next();
  }
}

export default Permissions;

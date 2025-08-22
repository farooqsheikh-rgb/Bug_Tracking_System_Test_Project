import { Request, Response, NextFunction } from "express";
import UserHandler from "../handlers/AuthHandler";
import { UserInterface } from "../interfaces/users";
import jwt from "jsonwebtoken";
import { Validators } from "../helpers/validator";
import BugHandler from "../handlers/BugHandler";
import ProjectHandler from "../handlers/ProjectHandler";

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
    }
  }
}

class Authentication {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      let tokenParts: string[] | null = Validators.isValidStr(
        authHeader as string
      )
        ? (authHeader as string).split(" ")
        : null;

      if (!Array.isArray(tokenParts) || tokenParts.length < 2) {
        console.log(`authenticate:: Token is invalid. token:: `, tokenParts);
        throw new Error("Error");
      }
      const token: any = tokenParts[1];
      console.log(token, "coming here", jwt, "secretkey");
      const decoded = jwt.verify(token, "secretkey") as {
        id?: string;
        email?: string;
        user_type?: string;
      };
      if (!decoded || !decoded.id || !decoded.email || !decoded.user_type) {
        console.log(
          `authenticate:: Token is invalid or expired. token:: ${token} decoded:: `,
          decoded
        );
        throw new Error("Error");
      }

      const user = await UserHandler.getAuthenticateUser(
        decoded.id,
        decoded.email,
        token
      );

      console.log(user);

      if (!user) {
        console.log(
          `authenticate:: Token is invalid, no user found. token:: ${token} decoded:: `,
          decoded
        );
        throw new Error("Error");
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);

      res.status(401).json({
        message: "Invalid Token",
      });
    }
  }

  static hasRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      if (req.user.user_type !== role) {
        return res
          .status(403)
          .json({ message: `Only ${role}s can perform this action` });
      }
      next();
    };
  }

  static hasAnyRole(roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          return res.status(401).json({ message: "User not authenticated" });
        }
        if (!roles.includes(req.user.user_type)) {
          return res
            .status(403)
            .json({ message: `Only ${roles.join(' or ')} can perform this action` });
        }
        if (req.user.user_type === "manager") {
          const bugId = Number(req.params.bugId);
          const bug = await BugHandler.getBugByIdByManager(bugId);
          if (!bug) {
            throw new Error("Bug not found");
          }
          const projectId = Number(bug.project_id);
          console.log(projectId);
          const checkPermission = await ProjectHandler.fetchProjectById(
            req.user.id!,
            projectId
          );
          if (!checkPermission) {
            return res
              .status(403)
              .json({ message: "Manager has no permission for this project" });
          }
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: (err as Error).message
        });
      }

      next();
    };
  }
}

export default Authentication;

import { Request, Response, NextFunction } from "express";
import UserHandler from "../handlers/AuthHandler";
import { UserInterface } from "../interfaces/users";
import jwt from "jsonwebtoken";
import Validators from "../helpers/validator";
import BugHandler from "../handlers/BugHandler";
import ProjectHandler from "../handlers/ProjectHandler";
import Exception from "../helpers/Exception";
import { ErrorCodes, UserConstants } from "../constants";

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
        
        throw new Exception(
          UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED,
          ErrorCodes.CONFLICT_WITH_CURRENT_STATE,
          { reportError: true }
        ).toJson();
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
        
        throw new Exception(
          UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED,
          ErrorCodes.CONFLICT_WITH_CURRENT_STATE,
          { reportError: true }
        ).toJson();
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
        
        throw new Exception(
          UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED,
          ErrorCodes.CONFLICT_WITH_CURRENT_STATE,
          { reportError: true }
        ).toJson();
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);

      return res.status(ErrorCodes.UNAUTHORIZED).json({
        message: UserConstants.MESSAGES.INVALID_AUTHENTICATION_TOKEN,
      });
    }
  }

  static hasRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(ErrorCodes.UNAUTHORIZED).json({
          message: UserConstants.MESSAGES.INVALID_AUTHENTICATION_TOKEN,
        });
      }
      if (req.user.user_type !== role) {
        return res.status(ErrorCodes.FORBIDDEN).json({
          message: UserConstants.MESSAGES.UNAUTHORIZED_USER,
        });
      }
      next();
    };
  }

  static hasAnyRole(roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          return res.status(ErrorCodes.UNAUTHORIZED).json({
            message: UserConstants.MESSAGES.INVALID_AUTHENTICATION_TOKEN,
          });
        }
        if (!roles.includes(req.user.user_type)) {
          return res.status(ErrorCodes.FORBIDDEN).json({
            message: UserConstants.MESSAGES.UNAUTHORIZED_USER,
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(ErrorCodes.UNAUTHORIZED).json({
          message: UserConstants.MESSAGES.INVALID_AUTHENTICATION_TOKEN,
        });
      }
      next();
    };
  }
}

export default Authentication;

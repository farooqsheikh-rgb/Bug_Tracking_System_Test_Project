import { Request, Response, NextFunction } from "express";
import UserHandler from "../handlers/UserHandler";
import { UserInterface } from "../interfaces/users";
import jwt from "jsonwebtoken";
import { Validators } from "../helpers/validator";

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
      const decoded = jwt.verify(token, "secretkey") as { id?: string; email?: string,user_type?:string };
      if (!decoded || !decoded.id || !decoded.email|| !decoded.user_type) {
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
  
  static async authenticateManager(req: Request, res: Response, next: NextFunction) {
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
      const decoded = jwt.verify(token, "secretkey") as { id?: string; email?: string,user_type?:string };
      if (!decoded || !decoded.id || !decoded.email|| !decoded.user_type) {
        console.log(
          `authenticate:: Token is invalid or expired. token:: ${token} decoded:: `,
          decoded
        );
        throw new Error("Error");
      }
      if (decoded.user_type !== 'manager') {
        return res.status(500).json({ message: 'Only managers can perform this action' });
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

  static async authenticateQA(req: Request, res: Response, next: NextFunction) {
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
      const decoded = jwt.verify(token, "secretkey") as { id?: string; email?: string,user_type?:string };
      if (!decoded || !decoded.id || !decoded.email|| !decoded.user_type) {
        console.log(
          `authenticate:: Token is invalid or expired. token:: ${token} decoded:: `,
          decoded
        );
        throw new Error("Error");
      }
      if (decoded.user_type !== 'QA') {
        return res.status(500).json({ message: 'Only QAs can perform this action' });
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

  static async authenticateManagerAndQA(req: Request, res: Response, next: NextFunction) {
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
      const decoded = jwt.verify(token, "secretkey") as { id?: string; email?: string,user_type?:string };
      if (!decoded || !decoded.id || !decoded.email|| !decoded.user_type) {
        console.log(
          `authenticate:: Token is invalid or expired. token:: ${token} decoded:: `,
          decoded
        );
        throw new Error("Error");
      }
      if (decoded.user_type !== 'QA' && decoded.user_type !== 'manager') {
        return res.status(500).json({ message: 'Only Managers & QAs can perform this action' });
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
}

export default Authentication;

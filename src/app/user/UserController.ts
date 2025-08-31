import { Request, Response } from "express";
import UserManager from "./UserManager";
import Validators from "../../helpers/validator";
import { ErrorCodes } from "../../constants/ErrorCodes";
import Exception from "../../helpers/Exception";

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserManager.getAllUsers();

      return res.json({
        success: true,
        data: users,
      });
    } catch (err) {
      console.error(`Get Users:: Request to get users failed.`, err);

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
            : "Failed to fetch users",
        });
    }
  }
}

export default UserController;

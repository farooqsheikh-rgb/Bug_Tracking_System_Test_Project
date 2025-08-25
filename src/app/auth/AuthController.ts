import { Request, Response } from "express";
import AuthManager from "./AuthManager";
import Validators from "../../helpers/validator";
import { ErrorCodes,UserConstants } from "../../constants";
import Exception from "../../helpers/Exception";

class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      console.log('sakjdkhsja')
      const user = await AuthManager.signup(req.body);

      return res.json({
        success: true,
        data: user,
      });
    } catch (err) {
      console.error(
        `signup:: Request to sign up user failed. data:: `,
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
            : UserConstants.MESSAGES.SIGN_UP_FAILED,
        });
    }
  }

  static async signin(req: Request, res: Response) {
    try {
      const user = await AuthManager.login(req.body);

      res.json({
        success: true,
        data: user,
      });
    } catch (err) {
      console.log(
        `login:: Request to login user failed. data:: `,
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
            : UserConstants.MESSAGES.LOGIN_FAILED,
        });
    }
  }
}

export default AuthController;

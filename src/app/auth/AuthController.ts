import { Request, Response } from "express";
import AuthManager from "./AuthManager";

class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { name, email, password, user_type } = req.body;
      const user = await AuthManager.signup(name, email, password, user_type);

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

      return res.status(500).json({
        success: false,
      });
    }
  }

  static async signin(req:Request, res:Response) {
    try {
      const {email,password} = req.body;
      const user = await AuthManager.login(email,password);

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

      return res
        .status(500)
        .json({
          success: false,
        });
    }
  }
}

export default AuthController;

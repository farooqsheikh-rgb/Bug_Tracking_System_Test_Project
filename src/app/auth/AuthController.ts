import { Request, Response } from 'express';
import AuthManager from './AuthManager';

class AuthController {
  static async signup(req: Request, res: Response): Promise<Response> {
    try {
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

      return res.status(500).json({
        success: false
      });
    }
  }
}

export default AuthController;

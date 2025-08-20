import User from "../../models/user";
import { Request, Response } from "express";

class UserController {
  static async getTheUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({});
      console.log(users);
      return res.json({
        success:true,
        data:users
      })
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({
        success: false,
      });
    }
  }
}
export default UserController;

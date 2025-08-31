import { Request, Response } from "express";
declare class UserController {
    static getAllUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default UserController;
//# sourceMappingURL=UserController.d.ts.map
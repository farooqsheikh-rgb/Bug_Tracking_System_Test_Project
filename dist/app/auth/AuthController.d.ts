import { Request, Response } from "express";
declare class AuthController {
    static signup(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static signin(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
export default AuthController;
//# sourceMappingURL=AuthController.d.ts.map
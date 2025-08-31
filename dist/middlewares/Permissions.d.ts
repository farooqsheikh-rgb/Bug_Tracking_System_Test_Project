import { Request, Response, NextFunction } from "express";
import { UserInterface } from "../interfaces/users";
declare global {
    namespace Express {
        interface Request {
            user?: UserInterface;
        }
    }
}
declare class Permissions {
    static checkPermission(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static checkPermissionForBugs(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
export default Permissions;
//# sourceMappingURL=Permissions.d.ts.map
import { Request, Response, NextFunction } from "express";
import { UserInterface } from "../interfaces/users";
declare global {
    namespace Express {
        interface Request {
            user?: UserInterface;
        }
    }
}
declare class Authentication {
    static authenticate(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static hasRole(role: string): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
    static hasAnyRole(roles: string[]): (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
export default Authentication;
//# sourceMappingURL=Authentication.d.ts.map
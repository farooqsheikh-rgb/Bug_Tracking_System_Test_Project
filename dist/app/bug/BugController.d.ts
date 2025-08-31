import { Request, Response } from "express";
declare class BugController {
    static createBug(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAllBugsByQA(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getBugById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static findBugByTitle(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteBugById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static assignBugToDeveloper(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getBugAssignee(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateBugStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getBugsByProject(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default BugController;
//# sourceMappingURL=BugController.d.ts.map
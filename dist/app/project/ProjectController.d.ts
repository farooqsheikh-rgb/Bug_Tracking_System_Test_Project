import { Request, Response } from "express";
declare class ProjectController {
    static createProject(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAllProjects(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getProjectById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static searchProjectsByName(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteProjectById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static addProjectMembers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getProjectMembers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default ProjectController;
//# sourceMappingURL=ProjectController.d.ts.map
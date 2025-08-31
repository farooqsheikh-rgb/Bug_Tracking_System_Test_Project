import Project from "../models/project";
import User from "../models/user";
declare class ProjectHandler {
    static findProjectByName(name: string, user_id: number, user_type: string): Promise<Project[]>;
    static createProject(name: string, description: string, manager_id: number): Promise<Project>;
    static fetchProjectsByManager(manager_id: number, options?: {
        sortField?: string;
        sortOrder?: string;
        page?: number;
        limit?: number;
        offset?: number;
    }): Promise<{
        projects: Project[];
        total: number;
    }>;
    static fetchProjectsByQAOrDeveloper(user_id: number, options?: {
        sortField?: string;
        sortOrder?: string;
        page?: number;
        limit?: number;
        offset?: number;
    }): Promise<{
        projects: Project[];
        total: number;
    }>;
    static fetchProjectById(manager_id: number, id: number): Promise<Project | null>;
    static fetchProjectByName(manager_id: number, name: string): Promise<Project | null>;
    static deleteProjectById(manager_id: number, id: number): Promise<number>;
    static assignMembersToProject(managerId: number, projectId: number, userIds: number[]): Promise<unknown>;
    static fetchAssignedMembersForProjectByManager(projectId: number): Promise<User[]>;
    static fetchAssignedMembersForProject(userId: number): Promise<Project[]>;
}
export default ProjectHandler;
//# sourceMappingURL=ProjectHandler.d.ts.map
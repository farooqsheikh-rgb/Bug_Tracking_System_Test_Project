import { UserInterface } from "../../interfaces/users";
declare class ProjectManager {
    static createProject(name: string, description: string, manager_id?: number): Promise<import("../../models/project").default>;
    static listProjectsByManager(user: UserInterface, options?: {
        sortField?: string;
        sortOrder?: string;
        page?: number;
        limit?: number;
        offset?: number;
    }): Promise<{
        projects: import("../../models/project").default[];
        total: number;
    }>;
    static getProjectById(id: number, manager_id?: number): Promise<import("../../models/project").default | null>;
    static findProjectByName(name?: string, user_id?: number, user_type?: string): Promise<import("../../models/project").default[]>;
    static deleteProjectById(id: number, manager_id?: number): Promise<number>;
    static assignMembersToProject(projectId: number, userIds: number[], managerId?: number): Promise<unknown>;
    static listProjectMembers(projectId: number): Promise<import("../../models/user").default[]>;
}
export default ProjectManager;
//# sourceMappingURL=ProjectManager.d.ts.map
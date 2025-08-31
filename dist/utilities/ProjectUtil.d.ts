declare class ProjectUtil {
    static validateCreateProjectRequest(name: string, description: string, manager_id?: number): void;
    static validateUserId(user_id?: number): void;
    static validateProjectId(id?: number): void;
    static validateProjectName(name?: string): void;
    static validateAssignMembersRequest(projectId: number, userIds?: number[], managerId?: number): void;
}
export default ProjectUtil;
//# sourceMappingURL=ProjectUtil.d.ts.map
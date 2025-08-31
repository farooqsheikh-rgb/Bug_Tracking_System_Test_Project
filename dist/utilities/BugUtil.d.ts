import { BugPayload } from "../interfaces/Bug";
declare class BugUtil {
    static validateCreateBugRequest({ title, description, deadline, screenshot, type, status, project_id, }: BugPayload, user_id?: number): void;
    static validateGetAllBugsByQARequest(user_id?: number): void;
    static validateGetBugByIdRequest(user_id?: number, bug_id?: number): void;
    static validateFindBugByNameRequest(name?: string, user_id?: number): void;
    static validateDeleteBugByIdRequest(user_id?: number, bug_id?: number): void;
    static validateAssignBugToDeveloperRequest(bugId: number, developerId?: number, userId?: number): void;
    static validateGetBugAssigneeRequest(bugId: number, userId?: number): void;
    static validateUpdateBugStatusRequest(user_id?: number, bug_id?: number, status?: string): void;
}
export default BugUtil;
//# sourceMappingURL=BugUtil.d.ts.map
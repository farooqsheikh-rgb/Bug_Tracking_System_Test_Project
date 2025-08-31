import { BugPayload } from "../../interfaces/Bug";
import { UserInterface } from "../../interfaces/users";
declare class BugManager {
    static createBug(payload: BugPayload, user_id?: number): Promise<import("../../models/bug").default>;
    static getAllBugsByQA(user_id?: number): Promise<import("../../models/bug").default[]>;
    static getBugById(user_id?: number, id?: number): Promise<import("../../models/bug").default>;
    static findBugByName(name?: string, user_id?: number): Promise<import("../../models/bug").default>;
    static deleteBugById(user_id?: number, id?: number): Promise<number>;
    static assignBugToDeveloper(bugId: number, developerId?: number, userId?: number): Promise<{}>;
    static getBugAssignee(bugId: number, userId?: number): Promise<import("../../models/user").default[]>;
    static updateBugStatus(bug_id: number, status: string, user_id?: number): Promise<[affectedCount: number]>;
    static getBugsByProject(project_id: number, user: UserInterface): Promise<import("../../models/bug").default[]>;
}
export default BugManager;
//# sourceMappingURL=BugManager.d.ts.map
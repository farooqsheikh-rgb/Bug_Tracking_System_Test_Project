import { BugPayload } from "../interfaces/Bug";
import Bug from "../models/bug";
import User from "../models/user";
import BugAssignedDeveloper from "../models/bugAssignedDeveloper";
import { UserInterface } from "../interfaces/users";
declare class BugHandler {
    static findBugByTitle(title: string, projectId: number): Promise<Bug | null>;
    static createBug(payload: BugPayload, user_id: number): Promise<Bug>;
    static getAllBugsByQA(user_id: number): Promise<Bug[]>;
    static getBugByIdByQA(user_id: number, id: number): Promise<Bug | null>;
    static getBugByIdByDeveloper(user_id: number, bug_id: number): Promise<BugAssignedDeveloper | null>;
    static getBugById(id: number): Promise<Bug | null>;
    static getBugByTitle(user_id: number, title: string): Promise<Bug | null>;
    static deleteBugById(user_id: number, id: number): Promise<number>;
    static assignBugToDeveloper(userId: number, bugId: number, developerId: number): Promise<unknown>;
    static getBugAssignee(bugId: number, userId: number): Promise<User[]>;
    static isDeveloperAssignedToBug(user_id: number, bug_id: number): Promise<boolean>;
    static updateBugStatus(bug_id: number, status: string): Promise<[affectedCount: number]>;
    static getBugsByProject(project_id: number, user: UserInterface): Promise<Bug[]>;
}
export default BugHandler;
//# sourceMappingURL=BugHandler.d.ts.map
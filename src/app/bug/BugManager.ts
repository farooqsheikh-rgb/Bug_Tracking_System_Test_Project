import { BugConstants, ErrorCodes } from "../../constants";
import BugHandler from "../../handlers/BugHandler";
import Exception from "../../helpers/Exception";
import { BugPayload } from "../../interfaces/Bug";
import { UserInterface } from "../../interfaces/users";
import BugUtil from "../../utilities/BugUtil";

class BugManager {
  static async createBug(payload: BugPayload, user_id?: number) {
    BugUtil.validateCreateBugRequest(payload, user_id);

    const existingBug = await BugHandler.findBugByTitle(
      payload.title,
      payload.project_id
    );

    if (existingBug) {
      throw new Exception(
        BugConstants.MESSAGES.BUG_ALREADY_EXISTS,
        ErrorCodes.CONFLICT_WITH_CURRENT_STATE,
        { reportError: true }
      );
    }

    const bug = await BugHandler.createBug(payload, user_id!);

    return bug;
  }

  static async getAllBugsByQA(user_id?: number) {
    BugUtil.validateGetAllBugsByQARequest(user_id);

    const bugs = await BugHandler.getAllBugsByQA(user_id!);
    return bugs;
  }

  static async getBugById(user_id?: number, id?: number) {
    BugUtil.validateGetBugByIdRequest(user_id, id);

    const bug = await BugHandler.getBugByIdByQA(user_id!, id!);

    if (!bug) {
      throw new Exception(
        BugConstants.MESSAGES.BUG_NOT_FOUND,
        ErrorCodes.DOCUMENT_NOT_FOUND,
        { reportError: true }
      );
    }

    return bug;
  }

  static async findBugByName(name?: string, user_id?: number) {
    BugUtil.validateFindBugByNameRequest(name, user_id);

    const bug = await BugHandler.getBugByTitle(user_id!, name!);

    if (!bug) {
      throw new Exception(
        BugConstants.MESSAGES.BUG_NOT_FOUND,
        ErrorCodes.DOCUMENT_NOT_FOUND,
        { reportError: true }
      );
    }

    return bug;
  }

  static async deleteBugById(user_id?: number, id?: number) {
    BugUtil.validateDeleteBugByIdRequest(user_id, id);

    const bug = await BugHandler.deleteBugById(user_id!, id!);

    if (!bug) {
      throw new Exception(
        BugConstants.MESSAGES.BUG_NOT_FOUND,
        ErrorCodes.DOCUMENT_NOT_FOUND,
        { reportError: true }
      );
    }

    return bug;
  }

  static async assignBugToDeveloper(
    bugId: number,
    developerId?: number,
    userId?: number
  ) {
    BugUtil.validateAssignBugToDeveloperRequest(bugId, developerId, userId);

    const assignedBugs = await BugHandler.assignBugToDeveloper(
      userId!,
      bugId,
      developerId!
    );

    if (!assignedBugs) {
      throw new Exception(
        BugConstants.MESSAGES.ASSIGN_BUG_FAILED,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        { reportError: true }
      );
    }

    return assignedBugs;
  }

  static async getBugAssignee(bugId: number, userId?: number) {
    BugUtil.validateGetBugAssigneeRequest(bugId, userId);

    const assignedBugs = await BugHandler.getBugAssignee(bugId, userId!);

    if (!assignedBugs) {
      throw new Exception(
        BugConstants.MESSAGES.FETCH_ASSIGNEE_FAILED,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        { reportError: true }
      );
    }

    return assignedBugs;
  }

  static async updateBugStatus(
    bug_id: number,
    status: string,
    user_id?: number
  ) {
    BugUtil.validateUpdateBugStatusRequest(user_id, bug_id, status);
    const bug = await BugHandler.getBugById(bug_id);
    if (!bug) {
      throw new Exception(
        BugConstants.MESSAGES.BUG_NOT_FOUND,
        ErrorCodes.DOCUMENT_NOT_FOUND,
        { reportError: true }
      );
    }

    const caseInsensitiveStatus = status.toLowerCase();

    const isAssigned = await BugHandler.isDeveloperAssignedToBug(
      user_id!,
      bug_id
    );
    if (!isAssigned) {
      throw new Exception(
        BugConstants.MESSAGES.DEVELOPER_NOT_ASSIGNED,
        ErrorCodes.UNAUTHORIZED,
        { reportError: true }
      );
    }

    const type = bug.type?.toLowerCase();

    const allowedStatusesByType: Record<string, string[]> = {
      bug: ["new", "started", "resolved"],
      feature: ["new", "started", "completed"],
    };

    const allowedStatuses = allowedStatusesByType[type];

    if (!allowedStatuses || !allowedStatuses.includes(caseInsensitiveStatus)) {
      throw new Exception(
        `${
          BugConstants.MESSAGES.INVALID_STATUS_FOR_TYPE
        } Allowed statuses for '${type}' are: ${
          allowedStatuses ? allowedStatuses.join(", ") : "none"
        }.`,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    const updatedBug = await BugHandler.updateBugStatus(
      bug_id,
      caseInsensitiveStatus
    );

    if (!updatedBug) {
      throw new Exception(
        BugConstants.MESSAGES.BUG_NOT_FOUND,
        ErrorCodes.DOCUMENT_NOT_FOUND,
        { reportError: true }
      );
    }

    return updatedBug;
  }

  static async getBugsByProject(project_id: number, user: UserInterface, options?: {
    page?: number;
    limit?: number;
    offset?: number;
    title?: string;
  }) {
    if (!project_id) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_PROJECT_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
    if (!user.id) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_USER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    const bugs = await BugHandler.getBugsByProject(project_id, user!, options);
    return bugs;
  }
}

export default BugManager;

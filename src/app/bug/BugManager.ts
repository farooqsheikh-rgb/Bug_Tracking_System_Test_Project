import { BugConstants, ErrorCodes } from "../../constants";
import BugHandler from "../../handlers/BugHandler";
import Exception from "../../helpers/Exception";
import { BugPayload } from "../../interfaces/Bug";
import BugUtil from "../../utilities/BugUtil";

class BugManager {
  static async createBug(payload: BugPayload, user_id?: number) {
    BugUtil.validateCreateBugRequest(payload, user_id);

    const existingBug = await BugHandler.findBugByTitle(payload.title);

    if (existingBug) {
      throw new Exception(
        BugConstants.MESSAGES.BUG_ALREADY_EXISTS,
        ErrorCodes.CONFLICT_WITH_CURRENT_STATE,
        { reportError: true }
      );
    }

    const bug = await BugHandler.createBug(
      payload,
      user_id!
    );

    return bug;
  }

  static async getAllBugsByQA(user_id?: number) {
    BugUtil.validateGetAllBugsByQARequest(user_id);

    const bugs = await BugHandler.getAllBugsByQA(user_id!);
    return bugs;
  }

  static async getBugById(user_id?: number, id?: number) {
    BugUtil.validateGetBugByIdRequest(user_id, id);

    const bug = await BugHandler.getBugById(user_id!, id!);

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
    userId?: number,
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
}

export default BugManager;

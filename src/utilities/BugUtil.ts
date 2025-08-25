import { BugConstants, ErrorCodes, UserConstants } from "../constants";
import Exception from "../helpers/Exception";
import Validators from "../helpers/validator";
import { BugPayload } from "../interfaces/Bug";

class BugUtil {
  static validateCreateBugRequest(
    {
      title,
      description,
      deadline,
      screenshot,
      type,
      status,
      project_id,
    }: BugPayload,
    user_id?: number
  ): void {
    if (
      !title ||
      !description ||
      !deadline ||
      !screenshot ||
      !type ||
      !status ||
      !project_id ||
      !user_id
    ) {
      console.log("validateCreateBugRequest:: Missing required fields");

      throw new Exception(
        BugConstants.MESSAGES.INVALID_DATA_TO_CREATE_BUG,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidStr(title)) {
      console.log("validateCreateBugRequest:: Invalid title. data::", title);

      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_TITLE,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidStr(description)) {
      console.log(
        "validateCreateBugRequest:: Invalid description. data::",
        description
      );

      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_DESCRIPTION,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidStr(type)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_TYPE,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidStr(status)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_STATUS,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidStr(screenshot)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_SCREENSHOT,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidDate(deadline)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_DEADLINE,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidNumber(project_id)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_PROJECT_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidNumber(user_id)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_USER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }

  static validateGetAllBugsByQARequest(user_id?: number): void {
    if (!Validators.isValidNumber(user_id)) {
      console.log("validateGetAllBugsByQARequest:: Invalid user ID:", user_id);

      throw new Exception(
        BugConstants.MESSAGES.INVALID_USER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }

  static validateGetBugByIdRequest(user_id?: number, bug_id?: number): void {
    if (!Validators.isValidNumber(user_id)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_USER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidNumber(bug_id)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }

  static validateFindBugByNameRequest(name?: string, user_id?: number): void {
    if (!Validators.isValidNumber(user_id)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_USER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if(!name){
        throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_TITLE,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidStr(name)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_TITLE,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }

  static validateDeleteBugByIdRequest(user_id?: number, bug_id?: number): void {
    if (!Validators.isValidNumber(user_id)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_USER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidNumber(bug_id)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }

  static validateAssignBugToDeveloperRequest(
    bugId: number,
    developerId?: number,
    userId?: number,
  ): void {
    if (!Validators.isValidNumber(userId)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_USER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidNumber(bugId)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidNumber(developerId)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_DEVELOPER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }

  static validateGetBugAssigneeRequest(bugId: number, userId?: number): void {
    if (!Validators.isValidNumber(bugId)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_BUG_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidNumber(userId)) {
      throw new Exception(
        BugConstants.MESSAGES.INVALID_USER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }
}
export default BugUtil;

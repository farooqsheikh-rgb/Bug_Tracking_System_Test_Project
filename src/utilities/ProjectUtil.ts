import { ProjectConstants, ErrorCodes } from "../constants";
import Exception from "../helpers/Exception";
import Validators from "../helpers/validator";

class ProjectUtil {
  static validateCreateProjectRequest(name: string, manager_id?: number): void {
    if (!name || !Validators.isValidStr(name)) {
      throw new Exception(
        ProjectConstants.MESSAGES.PROJECT_NAME_REQUIRED,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidNumber(manager_id)) {
      throw new Exception(
        ProjectConstants.MESSAGES.INVALID_MANAGER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }

  static validateManagerId(manager_id?: number): void {
    if (!Validators.isValidNumber(manager_id)) {
      throw new Exception(
        ProjectConstants.MESSAGES.INVALID_MANAGER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }

  static validateProjectId(id?: number): void {
    if (!Validators.isValidNumber(id)) {
      throw new Exception(
        ProjectConstants.MESSAGES.PROJECT_ID_MUST_BE_NUMBER,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }

  static validateProjectName(name?: string): void {
    if (!name || !Validators.isValidStr(name)) {
      throw new Exception(
        ProjectConstants.MESSAGES.PROJECT_NAME_REQUIRED,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }
  }

  static validateAssignMembersRequest(
    projectId: number,
    userIds?: number[],
    managerId?: number
  ): void {
    if (!Validators.isValidNumber(managerId)) {
      throw new Exception(
        ProjectConstants.MESSAGES.INVALID_MANAGER_ID,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Validators.isValidNumber(projectId)) {
      throw new Exception(
        ProjectConstants.MESSAGES.PROJECT_ID_MUST_BE_NUMBER,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    if (!Array.isArray(userIds) || userIds.length === 0) {
      throw new Exception(
        ProjectConstants.MESSAGES.INVALID_USER_IDS,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      );
    }

    for (let i = 0; i < userIds.length; i++) {
      let userId = userIds[i];

      if (!Validators.isValidNumber(userId)) {
        const parsedId = Validators.parseInteger(userId, 1);

        if (!Validators.isValidNumber(parsedId)) {
          throw new Exception(
            ProjectConstants.MESSAGES.INVALID_USER_ID_IN_ARRAY,
            ErrorCodes.BAD_REQUEST,
            { reportError: true }
          );
        } else {
          userIds[i] = parsedId;
        }
      }
    }
  }
}

export default ProjectUtil;

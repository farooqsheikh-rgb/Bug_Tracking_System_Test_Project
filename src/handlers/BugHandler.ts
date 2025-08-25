import { Op } from "sequelize";
import { BugConstants, ErrorCodes } from "../constants";
import Exception from "../helpers/Exception";
import { BugPayload } from "../interfaces/Bug";
import Bug from "../models/bug";
import Project from "../models/project";
import ProjectAssignment from "../models/projectMembers";
import User from "../models/user";
import BugAssignedDeveloper from "../models/bugAssignedDeveloper";

class BugHandler {
  static findBugByTitle(title: string) {
    return Bug.findOne({
      where: {
        title: {
          [Op.iLike]: title,
        },
      },
    });
  }

  static async createBug(payload: BugPayload, user_id: number) {
    const projectAssigned = await ProjectAssignment.findOne({
      where: { project_id: payload.project_id, user_id: user_id },
    });

    if (!projectAssigned) {
      throw new Exception(
        BugConstants.MESSAGES.BUG_ALREADY_EXISTS,
        ErrorCodes.CONFLICT_WITH_CURRENT_STATE,
        { reportError: true }
      );
    }

    const bug = Bug.build({
      ...payload,
      user_id,
    });

    return bug.save();
  }

  static getAllBugsByQA(user_id: number) {
    const bugs = Bug.findAll({ where: { user_id } });
    return bugs;
  }

  static getBugById(user_id: number, id: number) {
    const bug = Bug.findOne({ where: { id, user_id } });
    return bug;
  }

  static getBugByIdByManager(id: number) {
    const bug = Bug.findOne({ where: { id } });
    return bug;
  }
  static getBugByTitle(user_id: number, title: string) {
    const bug = Bug.findOne({
      where: {
        title: {
          [Op.iLike]: title,
        },
        user_id,
      },
    });
    return bug;
  }

  static async deleteBugById(user_id: number, id: number) {
    const bug = await Bug.destroy({ where: { id, user_id } });

    return bug;
  }

  static async assignBugToDeveloper(
    userId: number,
    bugId: number,
    developerId: number
  ) {
    const bug = await Bug.findOne({
      where: { id: bugId },
      include: [Project.associations.assignedUsers!],
    });

    if (!bug) {
      throw new Exception(
        BugConstants.MESSAGES.BUG_NOT_FOUND,
        ErrorCodes.DOCUMENT_NOT_FOUND,
        { reportError: true }
      );
    }
    const projectAssigned = await ProjectAssignment.findOne({
      where: { project_id: bug.project_id, user_id: developerId },
    });

    if (!projectAssigned) {
      throw new Exception(
        BugConstants.MESSAGES.NOT_ASSIGNED_TO_PROJECT,
        ErrorCodes.UNAUTHORIZED,
        { reportError: true }
      );
    }

    const user = await User.findOne({
      where: {
        id: developerId,
        user_type: "developer",
      },
    });

    if (!user) {
      throw new Exception(
        BugConstants.MESSAGES.USER_NOT_FOUND,
        ErrorCodes.DOCUMENT_NOT_FOUND,
        { reportError: true }
      );
    }

    const assignedDeveloper = await bug.$add("assignedDeveloper", user);
    return assignedDeveloper;
  }

  static async getBugAssignee(bugId: number, userId: number) {
    console.log(User.associations);
    // const users = await User.findAll({
    //   include: {
    //     model: Bug,
    //     as: "developerAssignedBugs",
    //     where: { id: bugId },
    //     attributes: ["id", "name", "email", "user_type"],
    //   },
    // });
    const users = await User.findAll({
      include: [
        {
          model: Bug,
          as: "developerAssignedBugs",
          where: { id: bugId },
          attributes: [],
          through: { attributes: [] },
        },
      ],
      attributes: ["id", "name", "email", "user_type"],
    });

    if (!users.length) {
      throw new Exception(
        BugConstants.MESSAGES.DEVELOPER_NOT_FOUND,
        ErrorCodes.DOCUMENT_NOT_FOUND,
        { reportError: true }
      );
    }

    return users;
  }
}

export default BugHandler;

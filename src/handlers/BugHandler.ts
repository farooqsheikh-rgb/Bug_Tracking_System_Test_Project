import { Op } from "sequelize";
import { BugConstants, ErrorCodes } from "../constants";
import Exception from "../helpers/Exception";
import { BugPayload } from "../interfaces/Bug";
import Bug from "../models/bug";
import Project from "../models/project";
import ProjectAssignment from "../models/projectMembers";
import User from "../models/user";
import BugAssignedDeveloper from "../models/bugAssignedDeveloper";
import { UserInterface } from "../interfaces/users";

class BugHandler {
  static findBugByTitle(title: string, projectId: number) {
    return Bug.findOne({
      where: {
        project_id: projectId,
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
        BugConstants.MESSAGES.QA_NOT_ASSIGNED_TO_PROJECT,
        ErrorCodes.FORBIDDEN,
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

  static getBugByIdByQA(user_id: number, id: number) {
    const bug = Bug.findOne({ where: { id, user_id } });
    return bug;
  }

  static getBugByIdByDeveloper(user_id: number, bug_id: number) {
    const bug = BugAssignedDeveloper.findOne({ where: { bug_id, user_id } });
    return bug;
  }

  static getBugById(id: number) {
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
    const bug = await Bug.destroy({ where: { id } });

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

  static async isDeveloperAssignedToBug(
    user_id: number,
    bug_id: number
  ): Promise<boolean> {
    const assignment = await BugAssignedDeveloper.findOne({
      where: {
        user_id,
        bug_id,
      },
    });

    return !!assignment;
  }

  static async updateBugStatus(bug_id: number, status: string) {
    const updatedBug = await Bug.update(
      { status },
      {
        where: { id: bug_id },
      }
    );

    return updatedBug;
  }

  static async getBugsByProject(project_id: number, user: UserInterface, options?: {
    page?: number;
    limit?: number;
    offset?: number;
    title?: string;
  }) {
    const user_id = user.id;
    const { page = 1, limit = 10, offset = 0, title = '' } = options || {};
    
    let whereClause: any = { project_id };
    
    if (title && title.trim() !== '') {
      whereClause.title = {
        [Op.iLike]: `%${title.trim()}%`
      };
    }
    
    if (user.user_type === 'developer') {
      const allBugs = await Bug.findAll({ 
        where: whereClause,
        include: [
          {
            model: User,
            as: "assignedDevelopers",
            attributes: ["id", "name", "email", "user_type"],
            through: { attributes: [] },
          },
        ],
      });
      
      const assignedBugs = await BugAssignedDeveloper.findAll({
        where: {
          bug_id: allBugs.map(bug => bug.id),
          user_id: user.id,
        },
      });
      
      const assignedBugIds = assignedBugs.map(b => b.bug_id);
      
      const total = await Bug.count({
        where: {
          ...whereClause,
          id: assignedBugIds
        }
      });
      
      const userBugs = await Bug.findAll({
        where: {
          ...whereClause,
          id: assignedBugIds
        },
        include: [
          {
            model: User,
            as: "assignedDevelopers",
            attributes: ["id", "name", "email", "user_type"],
            through: { attributes: [] },
          },
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });
      
      return {
        data: userBugs,
        total
      };
    } else {
      const total = await Bug.count({ where: whereClause });
      
      const bugs = await Bug.findAll({ 
        where: whereClause,
        include: [
          {
            model: User,
            as: "assignedDevelopers",
            attributes: ["id", "name", "email", "user_type"],
            through: { attributes: [] },
          },
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });   
      
      return {
        data: bugs,
        total
      };
    }
  }
}

export default BugHandler;

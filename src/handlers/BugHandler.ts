import Bug from "../models/bug";
import Project from "../models/project";
import ProjectAssignment from "../models/projectMembers";
import User from "../models/user";

class BugHandler {
  static findBugByTitle(title: string) {
    return Bug.findOne({ where: { title } });
  }

  static async createBug(
    title: string,
    description: string,
    deadline: Date,
    screenshot: string,
    type: string,
    status: string,
    project_id: number,
    user_id: number
  ) {
    const projectAssigned = await ProjectAssignment.findOne({
      where: { project_id: project_id, user_id: user_id },
    });

    if (!projectAssigned) {
      throw new Error("Project not found or you are not assigned.");
    }

    const bug = Bug.build({
      title,
      description,
      deadline,
      screenshot,
      type,
      status,
      project_id,
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
    const bug = Bug.findOne({ where: { title, user_id } });
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
      throw new Error("Bug not found or you are not the manager or qa.");
    }
    const projectAssigned = await ProjectAssignment.findOne({
      where: { project_id: bug.project_id, user_id: developerId },
    });

    if (!projectAssigned) {
      throw new Error("You are not assigned to this project.");
    }

    const user = await User.findOne({
      where: {
        id: developerId,
        user_type: "developer",
      },
    });

    if (!user) {
      throw new Error("No valid user found to assign.");
    }

    const assignedDeveloper = await bug.$add("assignedDeveloper", user);
    return assignedDeveloper;
  }

  static async getBugAssignee(bugId: number, userId: number) {
    const users = await User.findAll({
      include: {
        model: Bug,
        where: { id: bugId },
        attributes: ["id", "name", "email", "user_type"],
      },
    });

    if (!users.length) {
      throw new Error("Bug not found or you are not the manager or qa.");
    }

    return users;
  }
}

export default BugHandler;

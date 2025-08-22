import Project from "../models/project";
import User from "../models/user";

class ProjectHandler {
  static findProjectByName(name: string) {
    return Project.findOne({ where: { name } });
  }

  static createProject(name: string, manager_id: number) {
    const project = Project.build({ name, manager_id });
    return project.save();
  }

  static fetchProjectsByManager(manager_id: number) {
    const projects = Project.findAll({ where: { manager_id } });
    return projects;
  }

  static fetchProjectById(manager_id: number, id: number) {
    const project = Project.findOne({ where: { id, manager_id } });
    return project;
  }

  static fetchProjectByName(manager_id: number, name: string) {
    const project = Project.findOne({ where: { name, manager_id } });
    return project;
  }

  static async deleteProjectById(manager_id: number, id: number) {
    const project = await Project.destroy({ where: { id, manager_id } });

    return project;
  }

  static async assignMembersToProject(
    managerId: number,
    projectId: number,
    userIds: number[]
  ) {
    const project = await Project.findOne({
      where: { id: projectId, manager_id: managerId },
      include: [Project.associations.assignedUsers!],
    });

    if (!project) {
      throw new Error("Project not found or you are not the manager.");
    }

    const users = await User.findAll({
      where: {
        id: userIds,
        user_type: ["developer", "QA"],
      },
    });

    if (users.length === 0) {
      throw new Error("No valid users found to assign.");
    }

    const assignedUsers = await project.$add("assignedUsers", users);
    return assignedUsers;
  }

  static async fetchAssignedMembersForProject(
    projectId: number,
    managerId: number
  ) {
    const project = await Project.findOne({
      where: { id: projectId, manager_id: managerId },
      include: [
        {
          association: Project.associations.assignedUsers!,
          attributes: ["id", "name", "email", "user_type"],
        },
      ],
    });

    if (!project) {
      throw new Error("Project not found or you are not the manager.");
    }
    return project.assignedUsers;
  }
}

export default ProjectHandler;

import ProjectHandler from "../../handlers/ProjectHandler";

class ProjectManager {
  static async createProject(name: string, manager_id: number) {
    let project = await ProjectHandler.createProject(name, manager_id);
    return project;
  }

  static async listProjectsByManager(manager_id: number) {
    let projects = await ProjectHandler.fetchProjectsByManager(manager_id);
    return projects;
  }

  static async getProjectById(manager_id: number, id: number) {
    let project = await ProjectHandler.fetchProjectById(manager_id, id);
    return project;
  }

  static async findProjectByName(manager_id: number, name: string) {
    let project = await ProjectHandler.fetchProjectByName(manager_id, name);
    return project;
  }

  static async deleteProjectById(manager_id: number, id: number) {
    let project = await ProjectHandler.deleteProjectById(manager_id, id);
    return project;
  }

  static async assignMembersToProject(
    managerId: number,
    projectId: number,
    userIds: number[]
  ) {
    const assignedUsers = await ProjectHandler.assignMembersToProject(
      managerId,
      projectId,
      userIds
    );

    return assignedUsers;
  }

  static async listProjectMembers(projectId: number, managerId: number) {
    const getAssignedUsers = await ProjectHandler.fetchAssignedMembersForProject(
      projectId,
      managerId
    );

    return getAssignedUsers;
  }
}

export default ProjectManager;

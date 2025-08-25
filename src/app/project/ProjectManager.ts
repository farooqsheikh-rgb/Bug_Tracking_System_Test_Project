import ProjectHandler from "../../handlers/ProjectHandler";
import ProjectUtil from "../../utilities/ProjectUtil";

class ProjectManager {
  static async createProject(name: string, manager_id?: number) {
    ProjectUtil.validateCreateProjectRequest(name, manager_id);

    const project = await ProjectHandler.createProject(name, manager_id!);
    return project;
  }

  static async listProjectsByManager(manager_id?: number) {
    ProjectUtil.validateManagerId(manager_id);

    const projects = await ProjectHandler.fetchProjectsByManager(manager_id!);
    return projects;
  }

  static async getProjectById(id: number, manager_id?: number) {
    ProjectUtil.validateManagerId(manager_id);
    ProjectUtil.validateProjectId(id);

    const project = await ProjectHandler.fetchProjectById(manager_id!, id);
    return project;
  }

  static async findProjectByName(name?: string, manager_id?: number) {
    ProjectUtil.validateManagerId(manager_id);
    ProjectUtil.validateProjectName(name);

    const project = await ProjectHandler.fetchProjectByName(manager_id!, name!);
    return project;
  }

  static async deleteProjectById(id: number, manager_id?: number) {
    ProjectUtil.validateManagerId(manager_id);
    ProjectUtil.validateProjectId(id);

    const project = await ProjectHandler.deleteProjectById(manager_id!, id);
    return project;
  }

  static async assignMembersToProject(
    projectId: number,
    userIds: number[],
    managerId?: number
  ) {
    ProjectUtil.validateAssignMembersRequest(projectId, userIds, managerId);

    const assignedUsers = await ProjectHandler.assignMembersToProject(
      managerId!,
      projectId,
      userIds
    );

    return assignedUsers;
  }

  static async listProjectMembers(projectId: number, managerId?: number) {
    ProjectUtil.validateProjectId(projectId);
    ProjectUtil.validateManagerId(managerId);

    const assignedUsers = await ProjectHandler.fetchAssignedMembersForProject(
      projectId,
      managerId!
    );

    return assignedUsers;
  }
}

export default ProjectManager;

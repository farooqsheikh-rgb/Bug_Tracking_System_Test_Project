import ProjectHandler from "../../handlers/ProjectHandler";
import { UserInterface } from "../../interfaces/users";
import ProjectUtil from "../../utilities/ProjectUtil";

class ProjectManager {
  static async createProject(name: string, description: string, manager_id?: number) {
    ProjectUtil.validateCreateProjectRequest(name, description, manager_id);

    const project = await ProjectHandler.createProject(name, description, manager_id!);
    return project;
  }

  static async listProjectsByManager(user: UserInterface, options?: {
    sortField?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
    offset?: number;
  }) {
    ProjectUtil.validateUserId(user.id);

    let projects;
    switch (user.user_type) {
      case 'manager':
        projects = await ProjectHandler.fetchProjectsByManager(user.id!, options);
        break;
        
      case 'developer':
      case 'QA':
        projects = await ProjectHandler.fetchProjectsByQAOrDeveloper(user.id!, options);
        break;

      default:
        throw new Error('Unsupported role');
    }
    
    return projects;
  }

  static async getProjectById(id: number, manager_id?: number) {
    ProjectUtil.validateUserId(manager_id);
    ProjectUtil.validateProjectId(id);

    const project = await ProjectHandler.fetchProjectById(manager_id!, id);
    return project;
  }

  static async findProjectByName(name?: string, user_id?: number, user_type?: string) {
    ProjectUtil.validateUserId(user_id);
    ProjectUtil.validateProjectName(name);

    const project = await ProjectHandler.findProjectByName(name!, user_id!, user_type!);
    return project;
  }

  static async deleteProjectById(id: number, manager_id?: number) {
    ProjectUtil.validateUserId(manager_id);
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

  static async listProjectMembers(projectId: number) {
    ProjectUtil.validateProjectId(projectId);

    const assignedUsers = await ProjectHandler.fetchAssignedMembersForProjectByManager(
      projectId
    );

    return assignedUsers;
  }
}

export default ProjectManager;

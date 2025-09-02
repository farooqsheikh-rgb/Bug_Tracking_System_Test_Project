import Project from "../models/project";
import ProjectMembers from "../models/projectMembers";
import User from "../models/user";
import { Op } from "sequelize";

class ProjectHandler {
  static async findProjectByName(name: string, user_id: number, user_type: string) {
    if (user_type === 'manager') {
      const projects = await Project.findAll({
        where: {
          manager_id: user_id,
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      });
      return projects;
    }
    
    if (user_type === 'developer' || user_type === 'QA') {
      const memberships = await ProjectMembers.findAll({
        where: { user_id: user_id },
      });

      if (!memberships || memberships.length === 0) {
        return [];
      }

      const projectIds = memberships.map(m => m.project_id);

      const projects = await Project.findAll({
        where: {
          id: projectIds,
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      });
      
      return projects;
    }

    return [];
  }

  static createProject(name: string, description: string, manager_id: number) {
    const project = Project.build({ name, description, manager_id });
    return project.save();
  }

  static async fetchProjectsByManager(manager_id: number, options?: {
    sortField?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
    offset?: number;
  }) {
    const { sortField = 'name', sortOrder = 'asc', limit = 9, offset = 0 } = options || {};

    const { count, rows } = await Project.findAndCountAll({
      where: { manager_id },
      order: [[sortField, sortOrder.toUpperCase()]],
      limit,
      offset
    });
    
    return {
      projects: rows,
      total: count
    };
  }

  static async fetchProjectsByQAOrDeveloper(user_id: number, options?: {
    sortField?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
    offset?: number;
  }) {
    const { sortField = 'name', sortOrder = 'asc', limit = 9, offset = 0 } = options || {};
    
    const memberships = await ProjectMembers.findAll({
      where: { user_id: user_id },
    });

    if (!memberships?.length) {
      return {
        projects: [],
        total: 0
      };
    }

    const projectIds = memberships.map(m => m.project_id);

    const { count, rows } = await Project.findAndCountAll({
      where: {
        id: projectIds,
      },
      order: [[sortField, sortOrder.toUpperCase()]],
      limit,
      offset
    });
    
    return {
      projects: rows,
      total: count
    };
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

  static async fetchAssignedMembersForProjectByManager(
    projectId: number
  ) {
    const project = await Project.findOne({
      where: { id: projectId },
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

  static async fetchAssignedMembersForProject(
    userId: number
  ) {
    const memberships = await ProjectMembers.findAll({
      where: { user_id: userId },
    });

    if (!memberships) {
      throw new Error("Projects not found");
    }

    const projectIds = memberships.map(m => m.project_id);

    const projects = await Project.findAll({
      where: {
        id: projectIds,
      },
    });
    
    return projects;
  }
}

export default ProjectHandler;

import Project from "../models/project";
import User from "../models/user";

class AssignUsersHandler{
    static async assignUsersToProject(
        managerId: number,
        projectId: number,
        userIds: number[]
    ){
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
    
        const assignedUsers=await project.$add("assignedUsers", users);
        return assignedUsers;
    }

    static async getAssignedUsersOnProject(projectId:number,managerId:number){
        const project = await Project.findOne({
        where: { id: projectId, manager_id: managerId },
        include: [{
            association: Project.associations.assignedUsers!,
            attributes: ["id", "name", "email", "user_type"],
        }],
        });

        if (!project) {
        throw new Error("Project not found or you are not the manager.");
        }
        return project.assignedUsers;
    }
}

export default AssignUsersHandler;
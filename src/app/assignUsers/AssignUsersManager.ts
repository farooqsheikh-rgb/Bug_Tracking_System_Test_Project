import AssignUsersHandler from "../../handlers/AssignUsersHandler";

class AssignUsersManager{
    static async assignUsers(
        managerId: number,
        projectId: number,
        userIds: number[]
      ) {
        const assignedUsers= await AssignUsersHandler.assignUsersToProject(managerId,projectId,userIds);
    
        return assignedUsers;
      }
    
      static async getAssignedUsers(projectId: number, managerId: number) {
        const getAssignedUsers = await AssignUsersHandler.getAssignedUsersOnProject(projectId,managerId);

        return getAssignedUsers;
    }

}

export default AssignUsersManager;
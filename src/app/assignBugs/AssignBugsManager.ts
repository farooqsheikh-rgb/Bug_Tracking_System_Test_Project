import AssignBugsHandler from "../../handlers/AssignBugsHandler";

class AssignBugsManager{
    static async assignBugs(
        userId: number,
        bugId: number,
        developerId: number
      ) {
        const assignedBugs= await AssignBugsHandler.assignBugsToProject(userId,bugId,developerId);
    
        return assignedBugs;
      }
    
    static async assignBugsManager(
        userId: number,
        bugId: number,
        developerId: number
      ) {
        const assignedBugs= await AssignBugsHandler.assignBugsToProjectManager(userId,bugId,developerId);
    
        return assignedBugs;
      }

      static async getAssignedBugs(bugId: number, userId: number) {
        const getAssignedBugs = await AssignBugsHandler.getAssignedUserOnBug(bugId,userId);

        return getAssignedBugs;
    }

    

}

export default AssignBugsManager;
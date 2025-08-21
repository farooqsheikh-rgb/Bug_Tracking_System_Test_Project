import Bug from "../models/bug";
import Project from "../models/project";
import User from "../models/user";

class AssignBugsHandler{
    static async assignBugsToProject(
        userId: number,
        bugId: number,
        developerId: number
    ){
        const bug = await Bug.findOne({
          where: { id: bugId, qa_id: userId },
          include: [Project.associations.assignedUsers!],
        });
    
        if (!bug) {
          throw new Error("Bug not found or you are not the manager or qa.");
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
    
        const assignedDeveloper=await bug.$add("assignedDevelopers", user);
        return assignedDeveloper;
    }

    static async assignBugsToProjectManager(
        userId: number,
        bugId: number,
        developerId: number
    ){
        const bug = await Bug.findOne({
          where: { id: bugId, qa_id: userId },
          include: [Project.associations.assignedUsers!],
        });
    
        if (!bug) {
          throw new Error("Bug not found or you are not the manager or qa.");
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
    
        const assignedDeveloper=await bug.$add("assignedDevelopers", user);
        return assignedDeveloper;
    }

    static async getAssignedUserOnBug(bugId:number,userId:number){
        const bug = await Bug.findOne({
        where: { id: bugId, qa_id: userId },
        include: {
            association: Bug.associations.assignedDevelopers!,
            attributes: ["id", "name", "email", "user_type"],
        },
        });

        if (!bug) {
        throw new Error("Bug not found or you are not the manager or qa.");
        }
        return bug.assignedDevelopers;
    }
}

export default AssignBugsHandler;
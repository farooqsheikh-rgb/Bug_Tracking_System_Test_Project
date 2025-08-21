import BugHandler from "../../handlers/BugHandler";

class BugManager {
  static async addNew(title:string,description:string,deadline:Date,screenshot:string,type:string,status:string,project_id:number,qa_id:number) {
    let existingBug = await BugHandler.findBugByName(title);
    if (existingBug) {
      throw new Error("Bug with this name already exists.");
    }
    let bug = await BugHandler.createBug(title,description,deadline,screenshot,type,status,project_id,qa_id);
    return bug;
  }

  static async getBugs(manager_id: number) {
    let bugs = await BugHandler.getAllBugs( manager_id);
    return bugs;
  }

  static async getBug(manager_id: number,id:number) {
    let bug = await BugHandler.getOneBug( manager_id, id);
    return bug;
  }

  static async searchBug(manager_id: number,name:string) {
    let bug = await BugHandler.getOneBugByName( manager_id, name);
    return bug;
  }

  static async deleteBug(manager_id: number,id:number) {
    let bug = await BugHandler.deleteOneBug( manager_id, id);
    return bug;
  }
}

export default BugManager;

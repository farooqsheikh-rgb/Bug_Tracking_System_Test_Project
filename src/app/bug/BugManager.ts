import BugHandler from "../../handlers/BugHandler";

class BugManager {
  static async createBug(
    title: string,
    description: string,
    deadline: Date,
    screenshot: string,
    type: string,
    status: string,
    project_id: number,
    user_id: number
  ) {
    let existingBug = await BugHandler.findBugByTitle(title);
    if (existingBug) {
      throw new Error("Bug with this name already exists.");
    }
    let bug = await BugHandler.createBug(
      title,
      description,
      deadline,
      screenshot,
      type,
      status,
      project_id,
      user_id
    );
    return bug;
  }

  static async getAllBugsByQA(user_id: number) {
    let bugs = await BugHandler.getAllBugsByQA(user_id);
    return bugs;
  }

  static async getBugById(user_id: number, id: number) {
    let bug = await BugHandler.getBugById(user_id, id);
    if (!bug) {
      throw new Error('No bug found.')
    }
    return bug;
  }

  static async findBugByName(user_id: number, name: string) {
    let bug = await BugHandler.getBugByTitle(user_id, name);
    return bug;
  }

  static async deleteBugById(user_id: number, id: number) {
    let bug = await BugHandler.deleteBugById(user_id, id);
    return bug;
  }

  static async assignBugToDeveloper(
    userId: number,
    bugId: number,
    developerId: number
  ) {
    const assignedBugs = await BugHandler.assignBugToDeveloper(
      userId,
      bugId,
      developerId
    );

    return assignedBugs;
  }

  static async assignBugByManager(
    userId: number,
    bugId: number,
    developerId: number
  ) {
    const assignedBugs = await BugHandler.assignBugToDeveloper(
      userId,
      bugId,
      developerId
    );

    return assignedBugs;
  }

  static async getBugAssignee(bugId: number, userId: number) {
    const assignedBugs = await BugHandler.getBugAssignee(bugId, userId);

    return assignedBugs;
  }
}

export default BugManager;

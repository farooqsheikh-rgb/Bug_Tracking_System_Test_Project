import Bug from "../models/bug";
import ProjectAssignment from "../models/projectAssignment";

class BugHandler {
  static findBugByName(title: string) {
    return Bug.findOne({ where: { title } });
  }

  static async createBug(
    title: string,
    description: string,
    deadline: Date,
    screenshot: string,
    type: string,
    status: string,
    project_id: number,
    qa_id: number
  ) {
    const projectAssigned = await ProjectAssignment.findOne({
      where: { project_id: project_id, user_id: qa_id },
    });

    if (!projectAssigned) {
      throw new Error("Project not found or you are not assigned.");
    }

    const bug = Bug.build({
      title,
      description,
      deadline,
      screenshot,
      type,
      status,
      project_id,
      qa_id,
    });
    return bug.save();
  }

  static getAllBugs(manager_id: number) {
    const bugs = Bug.findAll({ where: { manager_id } });
    return bugs;
  }

  static async findOneProject() {}

  static getOneBug(manager_id: number, id: number) {
    const bug = Bug.findOne({ where: { id, manager_id } });
    return bug;
  }

  static getOneBugByName(manager_id: number, name: string) {
    const bug = Bug.findOne({ where: { name, manager_id } });
    return bug;
  }

  static async deleteOneBug(manager_id: number, id: number) {
    const bug = await Bug.destroy({ where: { id, manager_id } });

    return bug;
  }
}

export default BugHandler;

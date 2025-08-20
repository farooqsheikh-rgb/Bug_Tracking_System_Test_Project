import ProjectHandler from "../../handlers/ProjectHandler";

class ProjectManager {
  static async addNew(
    name: string,
    manager_id:number
  ) {
    // let existingProject = await ProjectHandler.findUserByName(name);
    // if (existingProject) {
    //   throw new Error("Project with this name already exists.");
    // }
    let project = await ProjectHandler.createProject(
      name,
      manager_id
    );
    return project;
  }
}

export default ProjectManager;

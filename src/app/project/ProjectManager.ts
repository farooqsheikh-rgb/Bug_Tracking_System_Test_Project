import ProjectHandler from "../../handlers/ProjectHandler";

class ProjectManager {
  static async addNew(name: string, manager_id: number) {
    // let existingProject = await ProjectHandler.findUserByName(name);
    // if (existingProject) {
    //   throw new Error("Project with this name already exists.");
    // }
    let project = await ProjectHandler.createProject(name, manager_id);
    return project;
  }

  static async getProjects(manager_id: number) {
    let projects = await ProjectHandler.getAllProjects( manager_id);
    return projects;
  }

  static async getProject(manager_id: number,id:number) {
    let project = await ProjectHandler.getOneProject( manager_id, id);
    return project;
  }

  static async searchProject(manager_id: number,name:string) {
    let project = await ProjectHandler.getOneProjectByName( manager_id, name);
    return project;
  }

  static async deleteProject(manager_id: number,id:number) {
    let project = await ProjectHandler.deleteOneProject( manager_id, id);
    return project;
  }
}

export default ProjectManager;

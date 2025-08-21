import Project from "../models/project";

class ProjectHandler {
  static findUserByName(name: string) {
    return Project.findOne({ where: { name } });
  }

  static createProject(
    name: string,
    manager_id:number
  ) {
    const project = Project.build({ name, manager_id});
    return project.save();
  }

  static getAllProjects(
    manager_id:number
  ) {
    const projects = Project.findAll({ where: {manager_id}});
    return projects;
  }

  static getOneProject(
    manager_id:number,
    id:number
  ) {
    const project = Project.findOne({ where: {id,manager_id}});
    return project;
  }

  static getOneProjectByName(
    manager_id:number,
    name:string
  ) {
    const project = Project.findOne({ where: {name,manager_id}});
    return project;
  }
  
  static async deleteOneProject(manager_id: number, id: number) {
    const project = await Project.destroy({ where: { id, manager_id } });

    return project; 
  }
}

export default ProjectHandler;

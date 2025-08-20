import { Validators } from "../helpers/validator";
import Project from "../models/project";
import User from "../models/user";

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
}

export default ProjectHandler;

import { Request,Response } from "express";
import ProjectManager from "./ProjectManager";

class ProjectController{
    static async addNew(req:Request,res:Response){
        try {
            const user = req.user;
      const { name } = req.body;
      console.log(user?.id +"UserID in PController");
      const project = await ProjectManager.addNew(name, user?.id!);

      return res.json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error(
        `signup:: Request to add project failed. data:: `,
        req.body,
        err
      );

      return res.status(500).json({
        success: false,
      });
    }
    }
}

export default ProjectController;
import { Model } from "sequelize-typescript";
import Project from "./project";
import User from "./user";
export default class Bug extends Model {
    id: number;
    title: string;
    description?: string;
    deadline?: Date;
    screenshot?: string;
    type: string;
    status: string;
    project_id: number;
    project: Project;
    user_id: number;
    qa: User;
    assignedDevelopers: User[];
}
//# sourceMappingURL=bug.d.ts.map
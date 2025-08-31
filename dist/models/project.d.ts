import { Model } from "sequelize-typescript";
import User from "./user";
import Bug from "./bug";
export default class Project extends Model {
    id: number;
    name: string;
    description: string;
    manager_id: number;
    manager: User;
    assignedUsers: User[];
    bugs: Bug[];
}
//# sourceMappingURL=project.d.ts.map
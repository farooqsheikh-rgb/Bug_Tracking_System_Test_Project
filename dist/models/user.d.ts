import { Model } from "sequelize-typescript";
import { UserInterface } from "../interfaces/users";
import Project from "./project";
import Bug from "./bug";
export default class User extends Model implements UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    accessToken: string;
    user_type: string;
    managedProjects: Project[];
    assignedProjects: Project[];
    reportedBugs: Bug[];
    developerAssignedBugs: Bug[];
}
//# sourceMappingURL=user.d.ts.map
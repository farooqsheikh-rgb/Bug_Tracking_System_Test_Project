import { UserInterface } from "../../interfaces/users";
import { SignIn } from "../../interfaces/SignIn";
declare class AuthManager {
    static signup(payload: UserInterface): Promise<import("../../models/user").default | null>;
    static login(payload: SignIn): Promise<import("../../models/user").default | null>;
    static setAccessToken(userId: number, userEmail: string, userType: string): Promise<import("../../models/user").default | null>;
}
export default AuthManager;
//# sourceMappingURL=AuthManager.d.ts.map
import { UserInterface } from '../interfaces/users';
type LoginData = {
    email?: string;
    password?: string;
};
declare class AuthUtil {
    static createHashedPassword(password: string): Promise<string>;
    static validateUserForSignUp(user: UserInterface): void;
    static validateUserToAuthenticate(user: UserInterface): void;
    static validateSignUpRequest(data: UserInterface): void;
    static validateLoginRequest(data: LoginData): void;
}
export default AuthUtil;
//# sourceMappingURL=AuthUtil.d.ts.map
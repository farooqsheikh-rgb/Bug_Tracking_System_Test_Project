import User from "../models/user";
declare class UserHandler {
    static setAccessToken(userId: number, accessToken: string): Promise<[affectedCount: number, affectedRows: User[]]>;
    static findUserByEmail(email: string): Promise<User | null>;
    static createUser(name: string, email: string, password: string, user_type: string): Promise<User>;
    static getAuthenticateUser(userId: string, email: string, authToken: string): Promise<User | null>;
}
export default UserHandler;
//# sourceMappingURL=AuthHandler.d.ts.map
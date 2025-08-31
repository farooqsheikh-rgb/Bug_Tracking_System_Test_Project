import { JwtPayload } from "jsonwebtoken";
declare class Token {
    static getLoginToken(userId: number, userEmail: string, userType: string): string;
    static verifyToken(token: string): JwtPayload | string | false;
}
export default Token;
//# sourceMappingURL=token.d.ts.map
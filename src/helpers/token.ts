import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

class Token {
  static getLoginToken(userId: number,userEmail:string,userType:string): string {
    const payload = {
      id: userId,
      email: userEmail,
      user_type:userType
    };

    const options: SignOptions = {
      expiresIn: "1d",
    };
    console.log("in getlogin");
    return jwt.sign(payload, "secretkey", options);
  }

  static verifyToken(token: string): JwtPayload | string | false {
    try {
      const decoded = jwt.verify(token, "secretkey");
      return decoded || false;
    } catch (err) {
      console.error(
        `verifyToken:: Could not verify the token. token:: ${token}`,
        err
      );
      return false;
    }
  }
}

export default Token;

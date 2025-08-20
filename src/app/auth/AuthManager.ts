import UserHandler from "../../handlers/UserHandler";
import Token from "../../helpers/token";
import hashingPassword from "../../utilities/hashingPassword";
import bcrypt from "bcrypt";
import UserUtil from "../../utilities/UserUtil";

class AuthManager {
  static async signup(
    name: string,
    email: string,
    password: string,
    user_type: string
  ) {
    let existingUser = await UserHandler.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }
    const hashedPassword: string = await hashingPassword(password);
    let user = await UserHandler.createUser(
      name,
      email,
      hashedPassword,
      user_type
    );
    const getUser = await AuthManager.setAccessToken(user.id,user.email,user.user_type);

    return getUser;
  }

  static async login(email: string, password: string) {
    let user = await UserHandler.findUserByEmail(email);
    const passwordMatched = await bcrypt.compare(password, user!.password);
    if (!passwordMatched) {
      throw new Error("Password not matched!");
    }
    user = await AuthManager.setAccessToken(user?.id!,user?.email!,user?.user_type!);
    return user;
  }

  static async setAccessToken(userId:number,userEmail:string,userType:string) {
    console.log("in setaccess");
    const accessToken = Token.getLoginToken(userId,userEmail,userType);
    const [_, [updatedUser]] = await UserHandler.setAccessToken(
      userId,
      accessToken
    );
    console.log(accessToken);
    let getUser = await UserHandler.findUserByEmail(userEmail);
    getUser = UserUtil.updateUserData(getUser);
    return getUser;
  }
}

export default AuthManager;

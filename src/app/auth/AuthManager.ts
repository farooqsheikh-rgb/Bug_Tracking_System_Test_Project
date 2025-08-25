import UserHandler from "../../handlers/AuthHandler";
import Token from "../../helpers/token";
import bcrypt from "bcrypt";
import UserUtil from "../../utilities/UserUtil";
import { UserInterface } from "../../interfaces/users";
import AuthUtil from "../../utilities/AuthUtil";
import { SignIn } from "../../interfaces/SignIn";
import Exception from "../../helpers/Exception";
import { ErrorCodes, UserConstants } from "../../constants";

class AuthManager {
  static async signup(
    payload: UserInterface
  ) {
    AuthUtil.validateSignUpRequest(payload);
    const existingUser = await UserHandler.findUserByEmail(payload.email);
    AuthUtil.validateUserForSignUp(existingUser!);

    const hashedPassword: string =  await AuthUtil.createHashedPassword(payload.password);
    const user = await UserHandler.createUser(
      payload.name,
      payload.email,
      hashedPassword,
      payload.user_type
    );
    const getUser = await AuthManager.setAccessToken(
      user.id,
      user.email,
      user.user_type
    );

    return getUser;
  }

  static async login(payload: SignIn) {
    AuthUtil.validateLoginRequest(payload);
    let user = await UserHandler.findUserByEmail(payload.email!);
    AuthUtil.validateUserToAuthenticate(user!);

    const passwordMatched = await bcrypt.compare(payload.password!, user!.password);
    if (!passwordMatched) {
      console.log(
        `login:: Password does not match. users:: ${JSON.stringify(
          user
        )} data:: `,
        payload
      );

      throw new Exception(
        UserConstants.MESSAGES.PASSWORD_DOES_NOT_MATCH,
        ErrorCodes.UNAUTHORIZED,
        { reportError: true }
      ).toJson();
    }
    user = await AuthManager.setAccessToken(
      user?.id!,
      user?.email!,
      user?.user_type!
    );
    return user;
  }

  static async setAccessToken(
    userId: number,
    userEmail: string,
    userType: string
  ) {
    console.log("in setaccess");
    const accessToken = Token.getLoginToken(userId, userEmail, userType);
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

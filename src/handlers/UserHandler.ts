import { Validators } from "../helpers/validator";
import User from "../models/user";

class UserHandler {
  static async setAccessToken(
    userId: number,
    accessToken: string,
  ) {
    return User.update(
      {
        accessToken: accessToken,
      },
      {
        where: {
          id: userId,
        },
        returning: true,
      }
    );
  }

  static findUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  static createUser(
    name: string,
    email: string,
    password: string,
    user_type: string
  ) {
    const user = User.build({ name, email, password, user_type });
    return user.save();
  }

  static getAuthenticateUser(userId:string, email:string, authToken:string) {
    return User.findOne({
      where: {
        email,
        id: Validators.parseInteger(userId, -1),
        accessToken: authToken,
      },
    });
  }
}

export default UserHandler;

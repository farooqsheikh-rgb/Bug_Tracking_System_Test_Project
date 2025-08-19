import UserHandler from "../../handlers/UserHandler";
import bcrypt from "bcrypt"; 
import { UserInterface } from "../../interfaces/users";

class AuthManager {
  static async signup(data: UserInterface){

    // static async signup(data: UserInterface): Promise<UserInterface> {
    let existingUser = await UserHandler.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password: hashedPassword,
    };
    // const user = await UserHandler.createUser(userData);
    // return user;
  }
}

export default AuthManager;
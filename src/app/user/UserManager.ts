import UserHandler from "../../handlers/UserHandler";

class UserManager {
  static async getAllUsers() {
    const users = await UserHandler.getAllUsers();
    return users;
  }
}

export default UserManager;

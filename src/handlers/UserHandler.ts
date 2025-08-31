import User from "../models/user";

class UserHandler {
  static async getAllUsers() {
    const users = await User.findAll({
      where: {
        user_type: ['QA', 'developer']
      },
      attributes: ['id', 'name', 'email', 'user_type'],
      order: [['name', 'ASC']]
    });

    return users;
  }
}

export default UserHandler;

import User from "../models/user";
import { UserInterface } from "../interfaces/users";

class UserHandler {
  static findUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

//   static createUser({data: UserInterface}) {
//     console.log(name, "sdfasd");
//     const user = User.build({ });

//     return user.save();
//   }
}

export default UserHandler;

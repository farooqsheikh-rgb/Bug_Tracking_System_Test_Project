class UserUtil {
  static updateUserData(user: any) {
    if (!user) {
      return user;
    }

    delete user.password;

    return user;
  }
}

export default UserUtil;

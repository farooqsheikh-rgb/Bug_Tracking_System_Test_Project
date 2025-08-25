import bcrypt from 'bcrypt';
import { ErrorCodes, UserConstants } from '../constants';
import Exception from '../helpers/Exception';
import Validators from '../helpers/validator';
import { UserInterface } from '../interfaces/users';

type SignUpData = {
  email?: string;
  password?: string;
};

type LoginData = {
  email?: string;
  password?: string;
};

class AuthUtil {
  static async createHashedPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  static validateUserForSignUp(user: UserInterface): void {
    if (user) {
      console.log(
        `validateUserForSignUp:: User already exist against this email. user:: `,
        user
      );

      throw new Exception(
        UserConstants.MESSAGES.USER_ALREADY_EXIST,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      ).toJson();
    }
  }

  static validateUserToAuthenticate(user: UserInterface ): void {
    if (!user) {
      console.log(
        `validateUserToAuthenticate:: User does not exist. user:: `,
        user
      );

      throw new Exception(
        UserConstants.MESSAGES.USER_DOES_NOT_EXIST,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      ).toJson();
    }
  }

  static validateSignUpRequest(data: UserInterface): void {
    if (!data || !data.email || !data.user_type) {
      console.log(
        `validateSignUpRequest:: Invalid data to sign up user. data:: `,
        data
      );

      throw new Exception(
        UserConstants.MESSAGES.INVALID_DATA_TO_SIGNUP_USER,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      ).toJson();
    }

    if (data.email && !Validators.isValidateEmail(data.email)) {
      console.log(`validateSignUpRequest:: Email is not valid. data:: `, data);

      throw new Exception(
        UserConstants.MESSAGES.INVALID_EMAIL,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      ).toJson();
    }

    if (!Validators.isValidStr(data.password!)) {
      console.log(
        `validateSignUpRequest:: Password is not valid. data:: `,
        data
      );

      throw new Exception(
        UserConstants.MESSAGES.INVALID_PASSWORD,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      ).toJson();
    }

    if (data.user_type && !Validators.isValidateUserType(data.user_type)) {
      console.log(`validateSignUpRequest:: Email is not valid. data:: `, data);

      throw new Exception(
        UserConstants.MESSAGES.INVALID_DATA_TO_SIGNUP_USER,
        ErrorCodes.BAD_REQUEST,
        { reportError: true }
      ).toJson();
    }

  }

  static validateLoginRequest(data: LoginData): void {
    if (!data || !data.email) {
      console.log(
        `validateLoginRequest:: Invalid data to login user. data:: `,
        data
      );

      throw new Exception(
        UserConstants.MESSAGES.INVALID_DATA_TO_LOGIN,
        ErrorCodes.UNAUTHORIZED,
        { reportError: true }
      ).toJson();
    }

    if (data.email && !Validators.isValidateEmail(data.email)) {
      console.log(
        `validateLoginRequest:: Invalid email to login user. data:: `,
        data
      );

      throw new Exception(
        UserConstants.MESSAGES.INVALID_EMAIL,
        ErrorCodes.UNAUTHORIZED,
        { reportError: true }
      ).toJson();
    }

    if (!Validators.isValidStr(data.password!)) {
      console.log(
        `validateLoginRequest:: Invalid password to login user. data:: `,
        data
      );

      throw new Exception(
        UserConstants.MESSAGES.INVALID_PASSWORD,
        ErrorCodes.UNAUTHORIZED,
        { reportError: true }
      ).toJson();
    }
  }
}


export default AuthUtil;
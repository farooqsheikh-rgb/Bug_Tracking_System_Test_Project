export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  password: string;
  accessToken?: string;
  user_type: string;
}

export interface IUser {
  id: string;
  email: string;
  password?: string;
  name: string;
  isAdmin: boolean;
  googleId?: string;
  token?: string;
}

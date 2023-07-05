export interface INewUser {
  id?: string;
  email: string;
  password?: string;
  name: string;
  googleId?: string;
  isAdmin: boolean;
}

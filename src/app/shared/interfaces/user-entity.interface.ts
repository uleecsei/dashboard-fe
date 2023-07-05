export interface IUserEntity {
  avatarUrl?: string | null;
  email: string;
  googleId?: string;
  id: string;
  isAdmin: boolean;
  name: string;
  password?: string;
  age: number;
}

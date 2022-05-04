export interface Member {
  id: number;
  userName: string;
  access: string;
  passwordHash: string;
  passwordSalt: string;
}
import { User } from "../entities/User";

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>;
  getById(id: String): Promise<User>;
  getByEmail(email: string): Promise<User>;
}

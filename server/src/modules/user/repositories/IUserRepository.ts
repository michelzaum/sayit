import { User } from "../entities/User";

export interface IUserRepository {
  create(data: User): Promise<User>;
  getById(id: String): Promise<User>;
}

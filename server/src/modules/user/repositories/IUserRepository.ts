import { User } from "../entities/User";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>;
  getById(id: String): Promise<User>;
  getByEmail(email: string): Promise<User>;
  update(id: string, body: IUpdateUserDTO): Promise<User>;
}

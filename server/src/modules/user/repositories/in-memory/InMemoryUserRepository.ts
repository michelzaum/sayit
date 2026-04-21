import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class InMemoryUserReposiory implements IUserRepository {
  public users: User[] = [];

  async create(data: User): Promise<User> {
    this.users.push(data);
    return data;
  }

  async getById(id: String): Promise<User> {
    const userById = this.users.find((user) => user.id === id);
    return userById;
  }

  async getByEmail(email: string): Promise<User> {
    const userByEmail = this.users.find((user) => user.email == email);
    return userByEmail;
  }
}
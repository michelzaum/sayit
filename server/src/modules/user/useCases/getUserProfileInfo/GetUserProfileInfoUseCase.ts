import { IUserRepository } from "../../repositories/IUserRepository";

export class GetUserProfileInfoUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(loggedUserId: string, id: string) {
    let canEdit = false;

    if (loggedUserId === id) {
      canEdit = true;
    }

    const userInfo = this.userRepository.getById(id);

    if (!userInfo) {
      throw new Error("User not found");
    }

    return {
      userInfo,
      canEdit,
    }
  }
}
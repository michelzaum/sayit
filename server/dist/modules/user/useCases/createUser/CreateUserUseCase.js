export class CreateuserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        return await this.userRepository.create(data);
    }
}

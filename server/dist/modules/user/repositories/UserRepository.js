import { prismaClient } from "../../../database/prisma/client";
export class UserRepository {
    async create(data) {
        return await prismaClient.user.create({
            data,
        });
    }
}

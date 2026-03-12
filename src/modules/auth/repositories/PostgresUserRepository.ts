import type { IUserRepository } from "./IUserRepository.js";
import type { User } from "../entities/User.js";
import { prisma } from "../../../config/database.js";

export class PostgresUserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        return user;
    }

    async create(user: Omit<User, "id" | "created_at">): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password_hash: user.password_hash,
            }
        });

        return newUser;
    }
}
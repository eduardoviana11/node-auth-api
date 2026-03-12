import type { IUserRepository } from './IUserRepository.js';
import type { User } from '../entities/User.ts';
import crypto from 'crypto';

export class UserRepository implements IUserRepository {
    private users: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(u => u.email === email);

        return user || null;
    }

    async create(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
        const newUser: User = {
            ...user,
            id: crypto.randomUUID(),
            created_at: new Date()
        };

        this.users.push(newUser);
        return newUser;
    }
}
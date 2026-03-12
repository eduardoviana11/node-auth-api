import type { User } from '../entities/User.ts';

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    create(user: Omit<User, 'id' | 'created_at'>): Promise<User>;
}
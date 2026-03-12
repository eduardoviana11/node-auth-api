import type { User } from '../entities/User.ts';

export interface IUserRepository {
    create(user: Omit<User, 'id' | 'created_at'>): Promise<User>;
    update(id: string, data: Partial<Omit<User, "id" | "created_at">>): Promise<User>;
    delete(id: string): Promise<void>;

    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
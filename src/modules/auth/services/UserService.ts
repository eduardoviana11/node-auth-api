import type { User } from "../entities/User.js";
import type { IUserRepository } from "../repositories/IUserRepository.js";
import * as argon2 from "argon2";

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    async getProfile(id: string) {
        const user = await this.userRepository.findById(id);
        if(!user) throw new Error("Usuário não encontrado.");
        
        const { password_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    
    async deleteProfile(id: string) {
        const user = await this.userRepository.findById(id);
        if(!user) throw new Error("Usuário não encontrado.");
        
        await this.userRepository.delete(id);
        
    }
    
    async updateProfile(id: string, data: { name?: string; email?: string; password?: string }) {
        const user = await this.userRepository.findById(id);
        if(!user) throw new Error("Usuário não encontrado.");

        const updatedData: Partial<User> = {};
        
        if(data.name) updatedData.name = data.name;

        if(data.email) {
            const emailExists = await this.userRepository.findByEmail(data.email);

            if(emailExists && emailExists.id !== id) throw new Error("E-mail já está sendo usado por outro usuário.");

            updatedData.email = data.email;
        }

        if(data.password) {
            const pepper = process.env.PEPPER_SECRET;

            if(!pepper) {
                throw new Error("PEPPER_SECRET não definido.");
            }

            const hash = await argon2.hash(data.password, {
                secret: Buffer.from(pepper)
            });

            updatedData.password_hash = hash;
        }

        if (Object.keys(updatedData).length === 0) {
            throw new Error("Sem dados válidos para atualização.");
        }

        const updatedUser = await this.userRepository.update(id, updatedData);

        const {password_hash, ...UserWithoutPassword} = updatedUser;
        return UserWithoutPassword;
    }
}1
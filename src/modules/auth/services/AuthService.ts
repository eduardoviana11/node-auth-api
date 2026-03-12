import type { IUserRepository } from "../repositories/IUserRepository.js";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";


export class AuthService {
    constructor(private userRepository: IUserRepository) {}
        
    async create(name: string, email: string, password: string) {
        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new Error("Email já existente.");
        }

        const pepper = process.env.PEPPER_SECRET;
        if(!pepper) {
            throw new Error("PEPPER_SECRET não definido.");
        }

        const password_hash = await argon2.hash(password, {
            secret: Buffer.from(pepper)
        });

        const newUser = await this.userRepository.create({
            name,
            email,
            password_hash
        });

        return {
            message: "Usuário criado.",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        };
    }

    async login (email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        
        if(!user) {
            throw new Error("E-mail ou senha incorretos.");
        }
        
        const pepper = process.env.PEPPER_SECRET;
        if(!pepper) {
            throw new Error("PEPPER_SECRET não definido.");
        }
        
        const isPasswordValid = await argon2.verify(user.password_hash, password, {
            secret: Buffer.from(pepper)
        })
        
        if(!isPasswordValid) {
            throw new Error("E-mail ou senha incorretos.");
        }
        
        const jwtSecret = process.env.JWT_SECRET;
        if(!jwtSecret) {
            throw new Error("JWT_SECRET não definido.");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            jwtSecret,
            { expiresIn: '1d' }
        );

        return {
            message: "Login realizado com sucesso.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
}
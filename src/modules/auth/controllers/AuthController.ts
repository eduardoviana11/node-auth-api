import type { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

export class AuthController {
    constructor(private authService: AuthService) {}

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password } = req.body;

            const result = await this.authService.create(name, email, password);

            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const {email, password} = req.body;

            if(!email || !password) {
                res.status(400).json({ error: "E-mail e senha são obrigatórios." });
                return;
            }

            const result = await this.authService.login(email, password);

            res.status(200).json(result);
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }
}
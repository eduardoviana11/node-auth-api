import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        id: string,
        email: string,
    };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        res.status(401).json({ error: "Token não fornecido. Acesso negado." });
        return;
    }
    
    const [, token] = authHeader.split(" ");
    
    if(!token) {
        res.status(401).json({ error: "Token não fornecido. Acesso negado." });
        return;
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if(!jwtSecret) {
            throw new Error("JWT_SECRET não definido.");
        }

        const decoded = jwt.verify(token, jwtSecret);

        if(!decoded || typeof decoded === 'string') {
            throw new Error("Payload inválido");
        }

        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        return next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido ou expirado." });
    }
}
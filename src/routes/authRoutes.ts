import { Router } from 'express';
import type { Response } from 'express';
import { AuthController } from '../modules/auth/controllers/AuthController.js';
import { AuthService } from '../modules/auth/services/AuthService.js';
import { PostgresUserRepository } from '../modules/auth/repositories/PostgresUserRepository.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import type { AuthRequest } from '../middlewares/authMiddleware.js';

const authRoutes = Router();

const userRepository = new PostgresUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRoutes.post('/register', authController.create);
authRoutes.post('/login', authController.login);

authRoutes.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
    res.status(200).json({
        message: "Acesso autorizado.",
        user: req.user
    });
});

export { authRoutes };
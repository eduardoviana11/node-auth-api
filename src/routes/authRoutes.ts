import { Router } from 'express';
import { AuthController } from '../modules/auth/controllers/AuthController.js';
import { AuthService } from '../modules/auth/services/AuthService.js';
import { PostgresUserRepository } from '../modules/auth/repositories/PostgresUserRepository.js';

const authRoutes = Router();

const userRepository = new PostgresUserRepository();

const authService = new AuthService(userRepository);

const authController = new AuthController(authService);

authRoutes.post('/register', authController.create);
authRoutes.post('/login', authController.login);

export { authRoutes };
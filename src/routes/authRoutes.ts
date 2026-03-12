import { Router } from 'express';
import { AuthController } from '../modules/auth/controllers/AuthController.js';
import { AuthService } from '../modules/auth/services/AuthService.js';
import { UserController } from '../modules/auth/controllers/UserController.js';
import { UserService } from '../modules/auth/services/UserService.js';
import { PostgresUserRepository } from '../modules/auth/repositories/PostgresUserRepository.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authRoutes = Router();

const userRepository = new PostgresUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const userService = new UserService(userRepository);
const userController = new UserController(userService);

authRoutes.post('/register', authController.create);
authRoutes.post('/login', authController.login);

authRoutes.get('/me', authMiddleware, userController.showData);
authRoutes.delete('/me', authMiddleware, userController.delete);
authRoutes.patch('/me', authMiddleware, userController.update);

export { authRoutes };
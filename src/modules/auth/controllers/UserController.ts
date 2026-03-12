import type { Response } from 'express';
import type { AuthRequest } from '../../../middlewares/authMiddleware.js';
import type { UserService } from '../services/UserService.js';

export class UserController {
    constructor(private userService: UserService) {}

    showData = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.id;

            if(!userId) {
                res.status(400).json({ error: "Campo 'user' não enviado ou não preenchido corretamente." });
                return;
            }

            const user = await this.userService.getProfile(userId);
            
            if(!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
                return;
            }

            res.status(200).json(user);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    delete = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.id;
            
            if(!userId) {
                res.status(400).json({ error: "Campo 'user' não enviado ou não preenchido corretamente." });
                return;
            }
            
            await this.userService.deleteProfile(userId);
            
            res.status(204).send();
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }       
    }
    
    update = async(req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.id;
            const { name, email, password } = req.body;
            
            if(!userId) {
                res.status(400).json({ error: "Campo 'user' não enviado ou não preenchido corretamente." });
                return;
            }
            
            const updatedUser = await this.userService.updateProfile(userId, { name, email, password })

            res.status(200).json({
                message: "Perfil atualizado com sucesso.",
                user: updatedUser
            });

        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}
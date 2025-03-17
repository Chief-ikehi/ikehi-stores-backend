import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { LoginDto, RegisterDto } from '../validators/auth.validator';

const router = Router();

router.post('/register', validateRequest(RegisterDto), register);
router.post('/login', validateRequest(LoginDto), login);

export default router; 
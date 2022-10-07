import {Router} from 'express';
import {
	login,
	register,
	logout,
} from '../controlers/userAuth.mjs'
import {authenticateToken} from '../middleware/authMiddleware.mjs';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/logout', authenticateToken, logout);


export {
	authRoutes,
};

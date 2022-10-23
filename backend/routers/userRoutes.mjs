import {Router} from 'express';
import {
	allusers,
	blockUsers,
	deleteUsers,
	unBlockUsers,
	user,
} from '../controlers/usersController.mjs';
import {authenticateToken} from '../middleware/authMiddleware.mjs';
import {isAdmin} from '../middleware/permissionController.mjs';

const userRoutes = Router();

userRoutes.get('/', authenticateToken, user);
userRoutes.get('/allusers', authenticateToken, allusers);
userRoutes.put('/blockusers', authenticateToken, isAdmin, blockUsers);
userRoutes.put('/unblockusers', authenticateToken, isAdmin, unBlockUsers);
userRoutes.post('/', authenticateToken, isAdmin, deleteUsers);

export {
	userRoutes,
};

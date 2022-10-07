import {Router} from 'express';
import {
	allusers,
	blockUsers,
	deleteUsers,
	unBlockUsers,
	user,
} from '../controlers/usersController.mjs';

const userRoutes = Router();

userRoutes.get('/', user);
userRoutes.get('/allusers', allusers);
userRoutes.put('/blockusers', blockUsers);
userRoutes.put('/unblockusers', unBlockUsers);
userRoutes.post('/', deleteUsers);

export {
	userRoutes,
};

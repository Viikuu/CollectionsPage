import {Router} from 'express';
import {authenticateToken} from '../middleware/authMiddleware.mjs';
import {
	createComment,
	deleteComment,
	getCommentById,
	getCommentsByItemId,
	updateComment
} from '../controlers/commentController.mjs';

const commentRoutes = Router();

commentRoutes.get('/:commentId', getCommentById);
commentRoutes.get('/item/:itemId', getCommentsByItemId);

commentRoutes.delete('/:commentId', authenticateToken, deleteComment);
commentRoutes.post('/', authenticateToken, createComment);
commentRoutes.put('/:commentId', authenticateToken, updateComment);

export {
	commentRoutes,
};

import {Router} from 'express';
import {
	createCollection,
	deleteCollection,
	editCollection,
	getCollections
} from '../controlers/collectionController.mjs';
import {authenticateToken} from '../middleware/authMiddleware.mjs';

const collectionRoutes = Router();

collectionRoutes.get('/', getCollections);
collectionRoutes.delete('/:id', authenticateToken, deleteCollection);
collectionRoutes.put('/:id', authenticateToken, editCollection);
collectionRoutes.post('/', authenticateToken, createCollection);

export {
	collectionRoutes,
};

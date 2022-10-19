import {Router} from 'express';
import {createItem, deleteItem, getItemByCatt, getItemById, upgradeItem} from '../controlers/itemController.mjs';
import {authenticateToken} from '../middleware/authMiddleware.mjs';

const itemRoutes = Router();

itemRoutes.get('/:id', getItemById);
itemRoutes.get('/coll/:collectionId', getItemByCatt);

itemRoutes.delete('/:itemId', authenticateToken, deleteItem);
itemRoutes.post('/', authenticateToken, createItem);
itemRoutes.put('/:itemId', authenticateToken, upgradeItem);

export {
	itemRoutes,
};

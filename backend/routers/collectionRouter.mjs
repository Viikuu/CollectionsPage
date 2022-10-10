import {Router} from 'express';
import {
	createCollection,
	deleteCollection,
	editCollection,
	getCollections
} from '../controlers/collectionController.mjs';

const collectionRoutes = Router();

collectionRoutes.get('/', getCollections);
collectionRoutes.delete('/:id', deleteCollection);
collectionRoutes.put('/:id', editCollection);
collectionRoutes.post('/', createCollection);

export {
	collectionRoutes,
};

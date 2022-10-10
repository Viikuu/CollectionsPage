import {collAuthor} from '../middleware/collAuthor.mjs';
import {ItemModel} from '../models/itemModel.mjs';
import {CollectionModel} from '../models/collectionModel.mjs';

const createItem = async (request, response, next) => {
	try {
		const {collectionId, item} = request.body;
		const collection = await CollectionModel.find({_id:collectionId});
		if(await collAuthor(collection, request._id)) {
			for(const tag in collection.tags) {
				if(item[tag] === undefined) {
					return response.json({state: false, message: ''});
				}
			}
			const {name, tags, ...other} = item;

			await ItemModel.create(
				{
					collectionId,
					name: item.name,
					tags: item.tags,
					other: other,
				});
			return response.json({state: true});
		}
		return response.json({state: true, message: 'Unauthorized'});

	} catch (error) {
		next(error);
	}
}

export {
	createItem,
};

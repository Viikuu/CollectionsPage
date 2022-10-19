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
					likes: 0,
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

const upgradeItem = async (request, response, next) => {
	try {
		const itemId = request.params.itemId;
		const {item} = request.body;
		const collection = await CollectionModel.find({_id:item.collectionId});
		if(await collAuthor(collection, request._id) && itemId === item._id) {
			for(const tag in collection.tags) {
				if(item[tag] === undefined) {
					return response.json({state: false, message: ''});
				}
			}
			const {name, tags, ...other} = item;
			await ItemModel.findByIdAndUpdate({
					_id : item._id
				},
				{
					likes: item.likes,
					collectionId: item.collectionId,
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

const getItemByCatt = async (request, response, next) => {
	try {
		const collectionId = request.params.collectionId;
		const items = await ItemModel.find({collectionId: collectionId});
		return response.json({state: true, data : items });
	} catch (error) {
		next(error);
	}
}

const getItemById = async (request, response, next) => {
	try {
		const itemId = request.params.itemId;
		const item = await ItemModel.find({_id: itemId});
		return response.json({state: true, data : item });
	} catch (error) {
		next(error);
	}
}

const deleteItem = async (request, response, next) => {
	try {
		const itemId = request.params.itemId;
		const item = await ItemModel.find({_id: itemId});
		if(await collAuthor(await CollectionModel.find({_id: item.collectionId}), request._id)) {
			await ItemModel.findByIdAndDelete(itemId);
			return response.json({state: true, data : item });
		}
		return response.json({state: true, message: 'Unauthorized'});
	} catch (error) {
		next(error);
	}
}

export {
	createItem,
	getItemByCatt,
	getItemById,
	deleteItem,
	upgradeItem,
};

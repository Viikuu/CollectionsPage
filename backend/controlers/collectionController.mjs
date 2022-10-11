import {CollectionModel} from '../models/collectionModel.mjs';
import {collAuthor} from '../middleware/collAuthor.mjs';

const createCollection = async (request, response, next) => {
	try {
		const {name, description, author, topic, tags, items} = request.body;
		const nameCheck = await CollectionModel.findOne({name});
		if (nameCheck) {
			return response.json({message: 'Name already used', state: false});
		}
		await CollectionModel.create(
			{
				name,
				description,
				author,
				topic,
				tags,
				items,
			});
		return response.json({state: true});
	} catch (error) {
		next(error);
	}
}

const getCollections = async (request, response, next) => {
	try {
		const users = await CollectionModel.find();
		return response.json({state: true, users});
	} catch (error) {
		next(error);
	}
}

const editCollection = async (request, response, next) => {
	try {
		const {id, element} = request.body;
		if (id === request.params.id) {
			if(await collAuthor(await CollectionModel.find({_id: id}), request._id)) {
				await CollectionModel.findByIdAndUpdate(id, {
					name: element.name,
					description: element.description,
					topic: element.topic,
					tags: element.tags,
					items: element.items
				});
				return response.json({state: true});
			} else {
				return response.json({state: true, message: 'Unauthorized'});
			}
		}
		return response.json({state: true, message: 'Conflict'});
	} catch (error) {
		next(error);
	}
}

const deleteCollection = async (request, response, next) => {
	try {
		const {id} = request.params;
		if (await collAuthor(await CollectionModel.find({_id: id}), request._id)) {
			await CollectionModel.findByIdAndDelete(id);
			return response.json({state: true});
		}
		return response.json({state: true, message: 'Unauthorized'});
	} catch (error) {
		next(error);
	}
}

export {
	createCollection,
	getCollections,
	deleteCollection,
	editCollection
};

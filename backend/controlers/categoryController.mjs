import {CategoryModel} from '../models/categoryModel.mjs';

async function createNewCattUnlessExist(topic) {
	try {
		await CategoryModel.find({name: topic});
	} catch (error) {
		await CategoryModel.create({name: topic});
	}
}

export {
	createNewCattUnlessExist,
}
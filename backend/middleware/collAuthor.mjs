import {UserModel} from '../models/userModel.mjs';

export async function collAuthor (collection, userid) {
	const user = await UserModel.find({_id:userid}).select([
		'name',
		'rank',
	]);
	return collection.name === user.name || user.rank === 'admin';
}


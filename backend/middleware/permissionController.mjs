import {UserModel} from '../models/userModel.mjs';

async function collAuthor (collection, userid) {
	const user = await UserModel.find({_id:userid}).select([
		'name',
		'rank',
	]);
	return collection.author === user.name || user.rank === 'admin';
}

async function isAdmin (request, response, next) {
	const user = await UserModel.find({_id:request.id}).select([
		'rank',
	]);
	if(user.rank === 'admin'){
		next();
	}
	response.status(401).json({state: false, message: 'Unauthorized'});
}

export {
	collAuthor,
	isAdmin,
}


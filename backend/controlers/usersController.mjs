import {UserModel} from '../models/userModel.mjs';

const user = async (request, response, next) => {
	try {
		const user = await UserModel.findOne({_id: request.id}).select([
			'name',
			'_id',
			'status',
			'rank',
		]);
		return response.json({state: true,data: user})
	} catch (error) {
		next(error);
	}
}

const allusers = async (request, response, next) => {
	try {
		const users = await UserModel.find().select([
			'name',
			'email',
			'_id',
			'createdAt',
			'updatedAt',
			'status',
			'rank',
		]);
		return response.json({state: true, data: users})
	} catch (error) {
		next(error);
	}
}

const blockUsers = async (request, response, next) => {
	try {
		const ids = request.body;
		for (let _id of ids) {
			await UserModel.findOneAndUpdate({_id},
				{status: 'blocked'}
			);
		}
		try {
			if (ids.includes(request.id)) {
				response.clearCookie('token');
				return response.json({state: true, message: 'Unauthorized'});
			}
		} catch (error) {
			next(error);
		}
		return response.json({state: true});
	} catch (error) {
		next(error);
	}
}

const unBlockUsers = async (request, response, next) => {
	try {
		const ids = request.body;
		for (let _id of ids) {
			await UserModel.findOneAndUpdate(_id,
				{status: 'active'}
			);
		}
		return response.json({state: true});
	} catch (error) {
		next(error);
	}
}


const deleteUsers = async (request, response, next) => {
	try {
		const ids = request.body;
		for (let _id of ids) {
			await UserModel.findByIdAndDelete(_id);
		}
		try {
			const ids = request.body;
			if (ids.includes(request.id)) {
				response.clearCookie('token');
				return response.json({state: true, message: 'Unauthorized'});
			}
		} catch (error) {
			next(error);
		}
		return response.json({state: true});
	} catch (error) {
		next(error);
	}
}

export {
	allusers,
	user,
	blockUsers,
	deleteUsers,
	unBlockUsers,
};

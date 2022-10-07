import process from 'node:process';
import jwt from 'jsonwebtoken';
import {BlackList} from '../models/tokenblacklist.mjs';
import {UserModel} from '../models/userModel.mjs';

async function authenticateToken(request, response, next) {
	const token = request.cookies.token;
	if (token === null || token === undefined) {
		return response.json({state: false, msg: 'Unauthorized'});
	}
	let Blacklisted;
	try {
		Blacklisted = await BlackList.find({
			name: token,
		});
	} catch (error) {
		response.status(500).json({state: false, message: {error:"Server error", Code: "DBBL"}});
	}

	if (Blacklisted.length > 0) {
		response.sendStatus(401).json({state: false, message: 'Unauthorized'});
	} else {
		try {
			const element = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
			request.id = element._id;
			const userStatus = await UserModel.find({_id: element._id}).select(['status']);
			if (!userStatus) {
				return response.json({state: false, message: 'User deleted'});
			} else if(userStatus === "blocked") {
				return response.json({state: false, message: 'User blocked'});
			} else {
				next();
			}
		} catch (error) {
			if (error.name === 'TokenExpiredError') {
				response.status(401).json({state: false, message: 'Unauthorized'});
			} else {
				response.sendStatus(401);
			}
		}
	}
}

export {
	authenticateToken,
};
import {UserModel} from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import process from 'node:process';
import {BlackList} from '../models/tokenblacklist.mjs';

const register = async (request, response, next) => {
	try {
		const {name, email, password} = request.body;
		const nameCheck = await UserModel.findOne({name});
		if (nameCheck) {
			return response.json({message: 'Username already used', state: false});
		}
		const emailCheck = await UserModel.findOne({email});
		if (emailCheck) {
			return response.json({message: 'Email already used', state: false});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await UserModel.create({
			email,
			name,
			password: hashedPassword,
			rank: 'user',
			status: 'active',
		})
		delete user.password;

		const token = await user.generateAuthToken();
		response.cookie('token', token, {
			httpOnly: true,
		});

		return response.json({state: true});
	} catch (error) {
		next(error);
	}
}

const login = async (request, response) => {
	try {
		const {name, password} = request.body;
		const user = await UserModel.findOne({name});
		if (!user) {
			return response.json({message: 'Incorrect username or password', state: false});
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return response.json({message: 'Incorrect username or password', state: false});
		}
		delete user.password;
		if(user.status === "blocked") {
			return response.json({message: 'User blocked', state: false});
		}
		const token = await user.generateAuthToken();
		response.cookie('token', token);
		return response.json({state: true});
	} catch (error) {
		next(error);
	}
}

const logout = async (request, response, next) => {
	try {
		const token = request.cookies.token;
		response.clearCookie('token');
		let _id;
		try {
			_id = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		} catch (error) {
			return response.json({state: true, message: 'Logged out successfully'});
		}
		if (_id !== undefined) {
			await BlackList.create({
				name:token,
			});
			return response.json({state: true, message: 'Logged out successfully'});
		}
	} catch (error) {
		next(error);
	}
}

export {
	logout,
	register,
	login,
}
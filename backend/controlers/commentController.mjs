import {CommentModel} from '../models/commentModel.mjs';

const createComment = async (request, response, next) => {
	try {
		const {comment, itemId} = request.body;
		await CommentModel.create(
			{
				userId: request._id,
				itemId,
				content: comment,
			});
		return response.json({state: true});
	} catch (error) {
		next(error);
	}
}

const getCommentById = async (request, response, next) => {
	try {
		const {commentId} = request.params;
		const comment = await CommentModel.find({_id:commentId});
		return response.json({state: true,data: comment});
	} catch (error) {
		next(error);
	}
}

const getCommentsByItemId = async (request, response, next) => {
	try {
		const {itemId} = request.params;
		const comments = await CommentModel.find({itemId:itemId});
		return response.json({state: true,data: comments});
	} catch (error) {
		next(error);
	}
}

const updateComment = async (request, response, next) => {
	try {
		const {content} = request.body;
		const {commentId} = request.params;
		const comment = await CommentModel.find({_id: commentId});
		if(comment.userId === request._id) {
			await CommentModel.findByIdAndUpdate({
					_id:commentId,
				}, {
					content,
				});
			return response.json({state: true});
		}
		return response.json({state: true, message: 'Unauthorized'});
	} catch (error) {
		next(error);
	}
}

const deleteComment = async (request, response, next) => {
	try {
		const {commentId} = request.params;
		const comment = await CommentModel.find({_id: commentId});
		if(comment.userId === request._id) {
			await CommentModel.findByIdAndDelete(commentId);
			return response.json({state: true});
		}
		return response.json({state: true, message: 'Unauthorized'});
	} catch (error) {
		next(error);
	}
}

export {
	getCommentsByItemId,
	createComment,
	deleteComment,
	updateComment,
	getCommentById,
};

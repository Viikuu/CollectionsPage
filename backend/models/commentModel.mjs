import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		itemId: {
			type: String,
			required: true,
		},
		content:{
			type: String,
			required: true,
		},
	},
	{timestamps: true}

);

const CommentModel = mongoose.model('Comment', CommentSchema);

export {
	CommentModel,
};

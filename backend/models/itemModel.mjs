import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		collectionId: {
			type: String,
			required: true,
		},
		likes: {
			type:Number,
			required: true,
		},
		tags:{
			type: Array,
			required: true,
		},
		other: {
			type: Object, //other specified fields
		}
	},
	{timestamps: true}

);

const ItemModel = mongoose.model('Items', ItemSchema);

export {
	ItemModel,
};

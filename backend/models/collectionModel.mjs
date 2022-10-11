import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		description:{
			type: String,
			required: true,
		},
		author:{
			type: String,
			required: true,
		},
		topic:{
			type: String,
			required: true,
		},
		tags:{ // specified item tags
			type: Array,
			required: true,
		},
		items: {
			type: Array, //array of items ids
		}
	},
	{timestamps: true}

);

const CollectionModel = mongoose.model('Collections', CollectionSchema);

export {
	CollectionModel,
};

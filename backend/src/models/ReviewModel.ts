import { Schema, Model, model, Document } from "mongoose"

export interface IReview extends Document {
	Comment: string
	RecipeID: Schema.Types.ObjectId
	UserID: Schema.Types.ObjectId
	Rating: number
}

interface ReviewModel extends Model<IReview> {

}

const ReviewSchema: Schema<IReview> = new Schema({
	Comment: {
		type: String,
		required: true
	},
	RecipeID: {
		type: Schema.Types.ObjectId,
		ref: "Recipe",
		required: true
	},
	UserID: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	Rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	}
},
{
	timestamps: true
})

export default model<IReview, ReviewModel>("Review", ReviewSchema)

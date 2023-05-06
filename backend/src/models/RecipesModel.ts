import { Schema, Document, model, Model } from "mongoose"

export interface IRecipe extends Document {
	Name: string
	Description: string
	Ingredients: string[]
	Steps: string[]
	Images: string[]
	Reviews: string[]
	UserID: Schema.Types.ObjectId
}

interface RecipeModel extends Model<IRecipe> {

}

const RecipeSchema: Schema<IRecipe> = new Schema({
	Name: {
		type: String,
		required: true,
		// unique: true
	},
	Description: {
		type: String,
		required: true
	},
	Ingredients: {
		type: [String],
		required: true
	},
	Steps: {
		type: [String],
		required: true
	},
	Images: {
		type: [String],
		required: true,
		default: []
	},
	Reviews: {
		type: [String],
		required: true,
		default: []
	},
	UserID: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User"
	}
})

export default model<IRecipe, RecipeModel>("Recipe", RecipeSchema)
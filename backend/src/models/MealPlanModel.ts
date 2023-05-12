import { Schema, model, Document, Model } from "mongoose"

export interface IMealPlan extends Document {
	Name: string
	Recipes: Schema.Types.ObjectId[]
	UserID: Schema.Types.ObjectId
}

interface MealPlanModel extends Model<IMealPlan> {

}

const MealPlanSchema: Schema<IMealPlan> = new Schema({
	Name: {
		type: String,
		required: true
	},
	Recipes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Recipe",
			required: true
		}
	],
	UserID: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
},
{
	timestamps: true
})

export default model<IMealPlan, MealPlanModel>("MealPlan", MealPlanSchema)

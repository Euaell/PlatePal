import { Request, Response, NextFunction } from "express"
import RecipesModel, { IRecipe } from "../models/RecipesModel"
import UserModel from "../models/UserModel";

export class RecipesController {
	public static async getRecipies( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const recipies: IRecipe[] = await RecipesModel.find()
			return res.status(200).json({recipies})
		} catch (error) {
			next(error)
		}
	}

	public static async getRecipe( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { id } = req.params
			const recipe: IRecipe | null = await RecipesModel.findById(id)
			if (recipe) {
				return res.status(200).json({recipe})
			} else {
				return res.status(404).json({message: "Recipe not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async createRecipe( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { Name, Description,  Ingredients, Steps, Images, user } = req.body
			const recipe: IRecipe = await RecipesModel.create({ Name, Description, Ingredients, Steps, Images, UserID: user._id })
			await UserModel.findByIdAndUpdate(user._id, { $push: { RecipesMade: recipe._id } }, { new: true })
			return res.status(201).json({ recipe })
		} catch (error) {
			next(error)
		}
	}

	public static async updateRecipe( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			return res.status(200).json({message: "Recipe not Updated!"})
		} catch (error) {
			next(error)
		}
	}

	public static async deleteRecipe( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { id } = req.params
			const recipe: IRecipe | null = await RecipesModel.findByIdAndDelete(id)
			if (recipe) {
				return res.status(200).json({message: "Recipe Deleted!"})
			} else {
				return res.status(404).json({message: "Recipe not found"})
			}
		} catch (error) {
			next(error)
		}
	}
}

import { Request, Response, NextFunction } from "express"
import ReviewModel, { IReview } from "../models/ReviewModel"

export default class ReviewController {
	public static async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { Comment, Rating, RecipeID, user } = req.body
			const review = await ReviewModel.create({ Comment, Rating, RecipeID, UserID: user._id })
			return res.status(201).json({ review })
		} catch (error) {
			next(error)
		}
	}

	public static async getReviews(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const reviews: IReview[] = await ReviewModel.find({})
			return res.status(200).json({ reviews })
		} catch (error) {
			next(error)
		}
	}

	public static async getReview(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params
			const review: IReview = await ReviewModel.findById(id)
			if (!review) {
				return res.status(404).json({ message: "Review not found" })
			}
			return res.status(200).json({ review })
		} catch (error) {
			next(error)
		}
	}

	public static async getReviewsByRecipe(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { recipeID } = req.params
			const reviews: IReview[] = await ReviewModel.find({ RecipeID: recipeID }).sort({ createdAt: -1 })
			return res.status(200).json({ reviews })
		} catch (error) {
			next(error)
		}
	}

	public static async getReviewsByUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { user } = req.body
			const reviews: IReview[] = await ReviewModel.find({ UserID: user._id }).sort({ createdAt: -1 })
			return res.status(200).json({ reviews })
		} catch (error) {
			next(error)
		}
	}

	public static async deleteReview(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params
			const review: IReview = await ReviewModel.findByIdAndDelete(id)
			if (!review) {
				return res.status(404).json({ message: "Review not found" })
			}
			return res.status(200).json({ review })
		} catch (error) {
			next(error)
		}
	}
}
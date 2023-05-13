import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
	GraphQLID,
	GraphQLSchema, GraphQLInt, GraphQLFloat
} from "graphql"
import UserModel, { IUser } from "../models/UserModel";
import RecipesModel, { IRecipe } from "../models/RecipesModel";
import Authenticate from "../middlewares/Authenticate";
import { Request, Response } from "express";
import { GraphQLParams } from "express-graphql";
import ReviewModel, {IReview} from "../models/ReviewModel";

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		Username: { type: GraphQLString },
		Email: { type: GraphQLString },
		Password: { type: GraphQLString },
		Role: { type: GraphQLString },
		ProfilePic: { type: GraphQLString },
		FavoriteRecipes: {
			type: new GraphQLList(RecipeType),
			resolve(parent: IUser, args) {
				return UserModel.findById(parent.id).populate("FavoriteRecipes").then((user) => {
					return user.FavoriteRecipes
				})
			}
		},
		RecipesMade: {
			type: new GraphQLList(RecipeType),
			resolve(parent, args) {
				return UserModel.findById(parent.id).populate("RecipesMade").then((user) => {
					return user.RecipesMade
				})
			}
		}
	})
})

const RecipeType = new GraphQLObjectType({
	name: "Recipe",
	fields: () => ({
		id: { type: GraphQLID },
		Name: { type: GraphQLString },
		Description: { type: GraphQLString },
		Ingredients: { type: new GraphQLList(GraphQLString) },
		Steps: { type: new GraphQLList(GraphQLString) },
		Images: { type: new GraphQLList(GraphQLString) },
		Rating: { type: GraphQLFloat },
		Reviews: {
			type: new GraphQLList(ReviewType),
			async resolve(parent: IRecipe, args) {
				return ReviewModel.find({RecipeID: parent.id})
			}
		},
		User: {
			type: UserType,
			async resolve(parent: IRecipe, args) {
				return UserModel.findById(parent.UserID);
			}
		}
	})
})

const ReviewType = new GraphQLObjectType({
	name: "Review",
	fields: () => ({
		id: { type: GraphQLID },
		Comment: { type: GraphQLString },
		Rating: { type: GraphQLInt },
		User: {
			type: UserType,
			async resolve(parent, args) {
				return UserModel.findById(parent.UserID);
			}
		},
		Recipe: {
			type: RecipeType,
			async resolve(parent, args) {
				return RecipesModel.findById(parent.RecipeID);
			}
		},
	})
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return UserModel.findById(args.id).select("-Password")
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return UserModel.find({}).select("-Password")
			}
		},
		recipe: {
			type: RecipeType,
			description: "Get a recipe by ID",
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return RecipesModel.findById(args.id)
			}
		},
		recipes: {
			type: new GraphQLList(RecipeType),
			resolve(parent, args, context) {
				return RecipesModel.find({})
			}
		},
		login: {
			type: UserType,
			args: {
				Email: { type: GraphQLString },
				Password: { type: GraphQLString }
			},
			async resolve(parent, args, context) {
				const user: IUser | object = await UserModel.login(args.Email, args.Password)

				if (!(user instanceof UserModel)) {
					console.log("user is not instance of UserModel")
					return user
				}
				const token = user.GenerateToken()
				context.res.cookie("token", token, { httpOnly: true, sameSite: "none", secure: true })

				// remove password when sending to client
				user.Password = ""
				return user
			}
		},
		reviews: {
			type: new GraphQLList(ReviewType),
			resolve(parent, args) {
				return ReviewModel.find({})
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addRecipe: {
			type: RecipeType,
			args: {
				Name: { type: new GraphQLNonNull(GraphQLString) },
				Description: { type: new GraphQLNonNull(GraphQLString) },
				Ingredients: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
				Steps: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
				Images: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
			},
			async resolve(parent, args, context) {
				if (!context.user) {
					throw new Error("You must be logged in to create a recipe")
				}
				const recipe = await RecipesModel.create({...args, UserID: context.user._id})
				await UserModel.findByIdAndUpdate(context.user._id, { $push: { RecipesMade: recipe._id } })
				return recipe
			}
		},
		addReview: {
			type: ReviewType,
			args: {
				Comment: { type: new GraphQLNonNull(GraphQLString) },
				Rating: { type: new GraphQLNonNull(GraphQLInt) },
				RecipeID: { type: new GraphQLNonNull(GraphQLID) },
				UserID: { type: new GraphQLNonNull(GraphQLID) }
			},
			async resolve(parent, args): Promise<IReview> {
				const review: IReview = await ReviewModel.create(args)

				// add review to recipe and
				// recalculate rating
				const recipe: IRecipe = await RecipesModel.findById(args.RecipeID)
				// console.log(`(${recipe.Rating} * ${recipe.Reviews.length}) + ${args.Rating}) / (${recipe.Reviews.length} + 1)`)
				const newRation: number = recipe.Rating != 0 ? ((recipe.Rating * recipe.Reviews.length) + args.Rating) / (recipe.Reviews.length + 1) : args.Rating
				await RecipesModel.findByIdAndUpdate(args.RecipeID, {
					$push: { Reviews: review._id },
					$set: { Rating: newRation }
				})

				return review
			}
		}
	}
})

export async function createContext(req: Request, res: Response, params: GraphQLParams) {
	const user: IUser | null = await Authenticate.authenticateGraphql(req)
	return {
		user,
		req,
		res,
		params
	}
}

export default new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
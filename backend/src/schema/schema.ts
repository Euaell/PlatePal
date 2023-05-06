import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
	GraphQLID,
	GraphQLSchema
} from "graphql"
import UserModel from "../models/UserModel";
import RecipesModel from "../models/RecipesModel";

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
			resolve(parent, args) {
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
		Reviews: { type: new GraphQLList(GraphQLString) },
		User: {
			type: UserType,
			async resolve(parent, args) {
				return await UserModel.findById(parent.UserID)
			}
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return UserModel.findById(args.id)
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return UserModel.find({})
			}
		},
		recipe: {
			type: RecipeType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return RecipesModel.findById(args.id)
			}
		},
		recipes: {
			type: new GraphQLList(RecipeType),
			resolve(parent, args) {
				return RecipesModel.find({})
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
				Ingredients: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
				Steps: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
				Images: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
				UserID: { type: new GraphQLNonNull(GraphQLID) }
			},
			async resolve(parent, args) {
				const recipe = await RecipesModel.create(args)
				await UserModel.findByIdAndUpdate(args.UserID, { $push: { RecipesMade: recipe._id } })
				return recipe
			}
		},

	}
})

export default new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
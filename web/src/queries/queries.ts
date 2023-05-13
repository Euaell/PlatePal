import { DocumentNode, gql } from "@apollo/client"

export const LOGIN: DocumentNode = gql`
	query Login($Email: String!, $Password: String!) {
		login(Email: $Email, Password: $Password) {
			Username
			Email
			ProfilePic
		}
	}
`
export const GET_RECIPES: DocumentNode = gql`
	query GetRecipes {
		recipes {
			id
			Name
			Ingredients
			Steps
			Description
			Images
			Reviews {
				Comment
				Rating
			}
			User {
				Username
				Email
				ProfilePic
			}
		}
	}
`

export const GET_RECIPE: DocumentNode = gql`
	query GetRecipe($id: ID!) {
		recipe(id: $id) {
			Name
			Rating
			Ingredients
			Steps
			Description
			Images
			Reviews {
				Comment
				Rating
				User {
					Email
					Username
					ProfilePic
				}
			}
			User {
				id
				Username
				ProfilePic
				Email
			}
		}
	}
`

export const ADD_REVIEW: DocumentNode = gql`
	mutation AddReview($RecipeID: ID!, $Comment: String!, $Rating: Int!, $UserID: ID!) {
		addReview(RecipeID: $RecipeID, Comment: $Comment, Rating: $Rating, UserID: $UserID) {
			Comment
			Rating
			Recipe {
				Name
				Rating
			}
		}
	}
`

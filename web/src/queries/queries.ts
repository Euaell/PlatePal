import { gql } from "@apollo/client"

export const LOGIN = gql`
	query Login($Email: String!, $Password: String!) {
		login(Email: $Email, Password: $Password) {
			Username
			Email
			ProfilePic
		}
	}
`
export const GET_RECIPES = gql`
	query GetRecipes {
		recipes {
			id
			Name
			Ingredients
			Steps
			Description
			Images
			Reviews
			User {
				Username
				Email
				ProfilePic
			}
		}
	}
`
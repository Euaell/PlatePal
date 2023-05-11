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

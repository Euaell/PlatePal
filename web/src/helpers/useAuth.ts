import { useContext } from "react";
import {IUser, UserContext} from "./UserProvider.tsx";

const getFreshUser = (): IUser => {
	return {
		id: "",
		Username: "",
		Email: "",
		Role: "",
		ProfilePic: "",
		FavouriteRecipes: [],
		RecipesMade: [],
		token: null
	}
}

export function useAuth() {
	const {user, setUser} = useContext(UserContext)

	return {
		user,
		setUser: (obj: IUser) => {
			localStorage.setItem("user", JSON.stringify(obj))
			setUser(obj)
		},
		resetUser: () => {
			localStorage.removeItem("user")
			setUser(getFreshUser())
		}
	}
}
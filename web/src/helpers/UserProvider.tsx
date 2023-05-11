import {createContext, ReactNode, useEffect, useState} from "react"

export interface IUser {
	id: string,
	Username: string,
	Email: string,
	Role: string,
	ProfilePic: string,
	FavouriteRecipes: string[],
	RecipesMade: string[],
	token: string | null
}

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

export const UserContext = createContext<{user: IUser, setUser: (user: IUser) => void}>({
	user: getFreshUser(),
	setUser: (newUser: IUser) => { newUser }
})

export function UserProvider({ children }: {children: ReactNode}) {
	const [user, setUser] = useState(getFreshUser())

	useEffect(() => {
		const storedUser: string | null = localStorage.getItem('user')
		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
	}, [])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{ children }
		</UserContext.Provider>
	)
}

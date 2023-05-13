import axios, {AxiosInstance} from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL
// axios.defaults.withCredentials = true

const api: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	responseType: "json"
})

interface IEndpoints {
	users: {
		login: string,
		logout: string,
		verify: string,
		getUserByID: string
	},
	images: {
		single: string,
		multiple: string
	},
	recipes: {
		getRecipes: string,
		getRecipeByID: string,
		addRecipe: string
	},
	reviews: {
		addReview: string
	}
}

export const ENDPOINTS: IEndpoints = {
	users: {
		login: "users/login",
		logout: "users/logout",
		verify: "users/verifyuser",
		getUserByID: "users"
	},
	images: {
		single: "images",
		multiple: "images/multiple"
	},
	recipes: {
		getRecipes: "recipes",
		getRecipeByID: "recipes",
		addRecipe: "recipes",
	},
	reviews: {
		addReview: "reviews"
	}
}

export function apiEndpoint (endpoint: string) {
	const url = `${BASE_URL}/${endpoint}`
	const user = JSON.parse(localStorage.getItem("user") || "{}")
	const token = user.token || ""

	const options = {
		headers: {
			token
		}
	}

	return {
		get: () => api.get(url, options),
		getByID: (id: string) => api.get(`${url}/${id}`, options),
		post: (body: object) => api.post(url, body, options),
		put: (id: string, body: object) => api.put(`${url}/${id}`, body, options),
		delete: (id: string) => api.delete(`${url}/${id}`, options)
	}
}

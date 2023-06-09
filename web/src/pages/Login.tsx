import { JSX } from "react";
import useForm from "../helpers/useForm.ts";
import {Link, useNavigate} from "react-router-dom";
import { apiEndpoint, ENDPOINTS } from "../helpers/api";

import { useAuth } from "../helpers/useAuth.ts";

const loginModel = {
	Email: "",
	Password: ""
}

export default function Login(): JSX.Element {

	const navigate = useNavigate()

	const { setUser } = useAuth()
	function login() {
		console.log("login")
		apiEndpoint(ENDPOINTS.users.login)
			.post(values)
			.then((response) => {
				return response.data;
			})
			.then((data) => {
				console.log(data);
				setUser(data.user)
				navigate("/")
			})
			.catch(console.error);
	}

	const { values, handleChange, handleSubmit } = useForm(loginModel, login);
	return (
		<div className="max-w-sm mx-auto mt-8">
			<form onSubmit={handleSubmit} className="p-6 bg-base-200/75 shadow-md rounded-md">
				<h2 className="text-2xl font-bold mb-6">Login</h2>
				<div className="mb-4">
					<label htmlFor="Email" className="block font-semibold mb-2">Email</label>
					<input
						type="email"
						id="Email"
						name='Email'
						value={values.Email}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="Password" className="block font-semibold mb-2">Password</label>
					<input
						type="password"
						id="Password"
						name='Password'
						value={values.Password}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
					/>
				</div>
				<button
					type="submit"
					className="btn btn-accent w-full py-2 px-4 border-0 bg-green-600 hover:bg-green-700 hover:text-white focus:bg-black"
				>
					Login
				</button>

				<br />
				<br />
				<Link to={"/auth/signup"} className="w-full py-2 px-4 link">
					Don't have an account? Signup
				</Link>
			</form>
		</div>
	)
}

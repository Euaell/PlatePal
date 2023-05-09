import { JSX } from "react";
import useForm from "../helpers/useForm.ts";

const loginModel = {
	Email: "",
	Password: ""
}

export default function Login(): JSX.Element {
	function login() {
		console.log("login");
		console.log(values)
	}

	const { values, handleChange, handleSubmit } = useForm(loginModel, login);
	return (
		<div className="max-w-sm mx-auto mt-8">
			<form onSubmit={handleSubmit} className="p-6 bg-base-200/40 shadow-md rounded-md">
				<h2 className="text-2xl font-bold mb-6">Login</h2>
				<div className="mb-4">
					<label htmlFor="email" className="block font-semibold mb-2">Email</label>
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
					<label htmlFor="password" className="block font-semibold mb-2">Password</label>
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
					className="btn w-full py-2 px-4 btn-active btn-ghost hover:bg-gray-600 hover:text-white focus:bg-black"
				>
					Login
				</button>
			</form>
		</div>
	)
}
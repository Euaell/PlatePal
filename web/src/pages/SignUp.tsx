import { JSX } from "react";
import useForm from "../helpers/useForm.ts";
import {Link} from "react-router-dom";

const signupModel = {
	Username: "",
	Email: "",
	Password: "",
	ConfirmPassword: "",
	ProfilePic: ""
}

export default function SignUp(): JSX.Element {
	function signup() {
		console.log("Signup");
		console.log(values)
	}

	const { values, handleChange, handleSubmit } = useForm(signupModel, signup);
	return (
		<div className="max-w-sm mx-auto mt-8">
			<form onSubmit={handleSubmit} className="p-6 bg-base-200/75 shadow-md rounded-md">
				<h2 className="text-2xl font-bold mb-6">Signup</h2>
				<div className="mb-4">
					<label htmlFor="username" className="block font-semibold mb-2">Username</label>
					<input
						type="text"
						id="Username"
						name='Username'
						value={values.Username}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
					/>
				</div>
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
				<div className="mb-4">
					<label htmlFor="password" className="block font-semibold mb-2">Confirm Password</label>
					<input
						type="password"
						id="ConfirmPassword"
						name='ConfirmPassword'
						value={values.ConfirmPassword}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="profilepic" className="block font-semibold mb-2">Profile Picture</label>
					<input
						type="file"
						id="ProfilePic"
						name='ProfilePic'
						value={values.ProfilePic}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
					/>
				</div>

				<button
					type="submit"
					className="btn btn-accent w-full py-2 px-4 bg-green-600 border-0 hover:bg-green-700 hover:text-white focus:bg-black"
				>
					SIGN UP
				</button>

				<br />
				<br />
				<Link to={"/auth/login"} className="w-full py-2 px-4 link">
					Already have an account? Login
				</Link>
			</form>
		</div>
	)
}
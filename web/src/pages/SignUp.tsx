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
				{/*Username*/}
				<div className="mb-4">
					<label htmlFor="Username" className="block font-semibold mb-2">Username</label>
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
				{/*Email*/}
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
				{/*Password*/}
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
				{/*ConfirmPassword*/}
				<div className="mb-4">
					<label htmlFor="ConfirmPassword" className="block font-semibold mb-2">Confirm Password</label>
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
				{/*ProfilePic*/}
				<div className="form-control w-full max-w-sm mb-4">
					<label className="label">
						<span className="label-text">Pick a file</span>
					</label>
					<input
						type="file"
						accept="image/*"
						className="file-input file-input-bordered file-input-secondary w-full max-w-xm"
						name="ProfilePic"
						value={values.ProfilePic}
						onChange={handleChange}
						required
					/>

					<label className="label">
						<span className="label-text-alt">Max. 2MB</span>
					</label>
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
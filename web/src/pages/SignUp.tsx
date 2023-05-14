import { ChangeEvent, JSX } from "react";
import useForm from "../helpers/useForm.ts";
import { Link, useNavigate } from "react-router-dom";
import { apiEndpoint, ENDPOINTS } from "../helpers/api";

const signupModel = {
	Username: "",
	Email: "",
	verificationCode: "",
	Password: "",
	ConfirmPassword: "",
	ProfilePic: ""
}

export default function SignUp(): JSX.Element {
	const { values, setValues, handleChange, handleSubmit } = useForm(signupModel, signup);

	const navigate = useNavigate()

	function signup() {
		console.log(values)
		apiEndpoint(ENDPOINTS.users.signup)
			.post(values)
			.then(res => {
				console.log(res)
				navigate('../login')
			})
			.catch(console.error)
	}

	function handleVerifyEmail() {
		if (values.Email === "") return;
		apiEndpoint(ENDPOINTS.users.verifyEmail)
			.post({Email: values.Email})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	function handleProfilePic(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files === null) return;
		const file = e.target.files[0];
		if (!file) return;
		const formData = new FormData();
		formData.append("Profile", file);
		apiEndpoint(ENDPOINTS.images.single)
			.post(formData)
			.then((res) => {
				console.log(res);
				return res.data.data
			})
			.then((data) => {
				console.log(data)
				setValues({...values, ProfilePic: data.secure_url})
			})
			.catch((err) => {
				console.log(err);
			})
	}

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
					<button className='btn btn-accent mt-2' onClick={handleVerifyEmail}>Verify Email</button>
				</div>

				{/*Verification Code*/}
				<div className="mb-4">
					<label htmlFor="verificationCode" className="block font-semibold mb-2">Verification Code</label>
					<input
						type="text"
						id="verificationCode"
						name='verificationCode'
						value={values.verificationCode}
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
					<label htmlFor='ProfilePic' className="label">
						<span className="label-text">Pick a file</span>
					</label>
					<input
						type="file"
						id="ProfilePic"
						accept="image/*"
						className="file-input file-input-bordered file-input-secondary w-full max-w-xm"
						name="ProfilePic"
						onChange={handleProfilePic}
					/>

					<label htmlFor='ProfilePic' className="label">
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
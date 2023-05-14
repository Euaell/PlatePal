import { useAuth } from "../helpers/useAuth.ts";
import { ChangeEvent, useState } from "react";
import useForm from "../helpers/useForm.ts";

export default function Profile() {
	const { user } = useAuth()
	const [showForm, setShowForm] = useState(false)

	return (
		<div className="flex flex-col min-h-screen items-center justify-start space-y-4 bg-secondary-focus/5">
			<img
				className="h-32 w-32 rounded-full object-cover mt-10"
				src={user.ProfilePic}
				alt="Profile avatar"
			/>
			<h1 className="text-2xl font-semibold">{user.Username}</h1>
			<p className="text-gray-500">{user.Email}</p>

			{showForm ? <EditProfile setShowForm={setShowForm} /> :
				<button className='btn btn-accent' onClick={() => setShowForm(true)}>Edit Profile</button>
			}

		</div>
	)
}

const EditModel = () => {
	const editProfile = localStorage.getItem("editProfile")
	if (editProfile) {
		return JSON.parse(editProfile)
	}
	return {
		Username: "",
		Email: "",
		ProfilePic: ""
	}
}
function EditProfile({ setShowForm }: { setShowForm: (show: boolean) => void }) {

	const { values, handleChange, handleSubmit } = useForm(EditModel(), handleEdit)

	function handleEdit() {
		console.log("edit")
	}

	function handleChangeLocal(e: ChangeEvent<HTMLInputElement>) {
		localStorage.setItem("editProfile", JSON.stringify({
			...values,
			[e.target.name]: e.target.value
		}))
		handleChange(e)
	}

	function handleToggle() {
		if (Object.values(values).some((val) => val !== "")) {
			if (window.confirm("Are you sure you want to cancel?")) {
				localStorage.removeItem("editProfile")
				setShowForm(false)
			}
		} else {
			setShowForm(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="p-6 bg-base-200/25 shadow-md rounded-md">
			<h2 className="text-2xl font-bold mb-6">Edit</h2>
			<div className="mb-4">
				<label htmlFor="Username" className="block font-semibold mb-2">Username</label>
				<input
					type="text"
					id="Username"
					name='Username'
					value={values.Username}
					onChange={handleChangeLocal}
					className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="Email" className="block font-semibold mb-2">Email</label>
				<input
					type="email"
					id="Email"
					name='Email'
					value={values.Email}
					onChange={handleChangeLocal}
					className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
				/>
			</div>
			<div className="form-control w-full max-w-sm mb-4">
				<label htmlFor='ProfilePic' className="label">
					<span className="label-text">Pick a file</span>
				</label>
				<input
					type="file"
					id='ProfilePic'
					accept="image/*"
					className="file-input file-input-bordered file-input-secondary w-full max-w-xm"
					name="ProfilePic"
					value={values.ProfilePic}
					onChange={handleChangeLocal}
				/>

				<label htmlFor='ProfilePic' className="label">
					<span className="label-text-alt">Max. 2MB</span>
				</label>
			</div>

			<button
				type="submit"
				className="btn btn-accent inline w-1/3 mr-10 py-2 px-4 border-0 bg-green-600 hover:bg-green-700 hover:text-white focus:bg-black"
			>
				Save
			</button>
			<button
				type="submit"
				className="btn btn-accent inline w-1/3 ml-10 py-2 px-4 border-0 bg-red-600 hover:bg-red-700 hover:text-white focus:bg-black"
				onClick={() => handleToggle()}
			>
				Cancel
			</button>
		</form>
	)
}

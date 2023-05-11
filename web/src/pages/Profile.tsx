import {useAuth} from "../helpers/useAuth.ts";

export default function Profile() {
	const { user } = useAuth()

	return (
		<div className="flex flex-col min-h-screen items-center justify-start space-y-4 bg-primary-focus/5">
			<img
				className="h-32 w-32 rounded-full object-cover top-0"
				src={"/images/avatar.jpg"}
				alt="Profile avatar"
			/>
			<h1 className="text-2xl font-semibold">{user.Username}</h1>
			<p className="text-gray-500">{user.Email}</p>
			<button className='btn btn-accent'>Edit Profile</button>
		</div>
	)
}
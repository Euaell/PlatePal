import { JSX } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../helpers/useAuth.ts"
import {apiEndpoint, ENDPOINTS} from "../helpers/api";

export default function RootLayout(): JSX.Element {
	return (
		<div>
			<NavBar />
			<div className="container mx-auto">
				<Outlet />
			</div>
		</div>
	)
}

function NavBar(): JSX.Element {
	const { user } = useAuth()
	return (
		<div className="navbar bg-base-100" style={{position: "sticky", top: 0, left: 0}}>
			<div className="flex-1 ml-4">
				<Link to='/' className="btn btn-ghost normal-case text-xl">PlatePal</Link>
			</div>
			<div className="flex-none gap-2">
				<div className="form-control">
					<input type="text" placeholder="Search" className="input input-bordered" />
				</div>

				{user && user.token ?
					<AvatarDropDown /> :
					<LoginSignUp />
				}

			</div>
		</div>
	)
}

function AvatarDropDown(): JSX.Element {
	const { resetUser } = useAuth()

	function logout() {
		apiEndpoint(ENDPOINTS.users.logout)
			.post({})
			.then(() => {
				resetUser()
				// refresh page
				window.location.reload()
			})
			.catch(console.error);
	}

	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
				<div className="w-10 rounded-full">
					<img src="/images/avatar.jpg" alt='Avatar of User'/>
				</div>
			</label>
			<ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
				<li>
					<Link to='/profile' className="justify-between">
						Profile
						<span className="badge">New</span>
					</Link>
				</li>
				<li><Link to='/setting'>Settings</Link></li>
				<li><a onClick={() => logout()}>Logout</a></li>
			</ul>
		</div>
	)
}

function LoginSignUp(): JSX.Element {
	const navigate = useNavigate();

	return (
		<div className="flex-none gap-0.5">
			<button className="btn btn-ghost mx-1" onClick={() => navigate('/auth/login')}> Login </button>
			<button className="btn btn-outline btn-accent mx-1" onClick={() => navigate('/auth/signup')}> Sign Up </button>
		</div>
	)
}

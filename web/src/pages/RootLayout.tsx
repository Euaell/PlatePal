import { JSX } from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";

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

function NavBar() {
	return (
		<div className="navbar bg-base-100" style={{position: "sticky", top: 0, left: 0}}>
			<div className="flex-1 ml-4">
				<Link to='/' className="btn btn-ghost normal-case text-xl">PlatePal</Link>
			</div>
			<div className="flex-none gap-2">
				<div className="form-control">
					<input type="text" placeholder="Search" className="input input-bordered" />
				</div>

				<LoginSignUp />
				<AvatarDropDown />

			</div>
		</div>
	)
}

function AvatarDropDown(): JSX.Element {
	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
				<div className="w-10 rounded-full">
					<img src="/images/avatar.jpg"  alt='Avatar of User'/>
				</div>
			</label>
			<ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
				<li>
					<a className="justify-between">
						Profile
						<span className="badge">New</span>
					</a>
				</li>
				<li><a>Settings</a></li>
				<li><a>Logout</a></li>
			</ul>
		</div>
	)
}

function LoginSignUp(): JSX.Element {
	const navigate = useNavigate();

	return (
		<div className="flex-none gap-0.5">
			<button className="btn btn-ghost mx-1" onClick={() => navigate('/login')}> Login </button>
			<button className="btn btn-outline btn-accent mx-1" onClick={() => navigate('/signup')}> Sign Up </button>
		</div>
	)
}

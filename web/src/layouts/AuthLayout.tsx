import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
	return (
		<div className='min-h-screen' style={{ backgroundImage: `url("/images/authBG.jpg")`, backgroundSize: "cover", width: "100%" }}>
			<div className="navbar bg-base-200/0" style={{position: "sticky", top: 0, left: 0}}>
				<div className="flex-1 ml-4">
					<Link to='/' className="btn btn-accent  text-black normal-case text-xl">PlatePal</Link>
				</div>

			</div>
			<div className="container mx-auto overflow-auto">
				<Outlet />
			</div>
		</div>

	);
}
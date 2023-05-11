import './App.css'

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route, RouterProvider,
} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import SignUp from "./pages/SignUp.tsx";
import {UserProvider} from "./helpers/UserProvider.tsx";
import {JSX} from "react";
import Authenticate from "./helpers/Authenticate.tsx";
import Setting from "./pages/Setting.tsx";
import Profile from "./pages/Profile.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='auth' element={<AuthLayout />} >
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<SignUp />} />
			</Route>

			<Route path={'/'} element={<RootLayout />} >
				<Route index element={<Home />} />
				<Route element={<Authenticate />}>
					<Route path='recipes' element={<div>Recipes</div>} />

					<Route path='profile' element={<Profile />} />
					<Route path='setting' element={<Setting />} />

				</Route>
			</Route>

			<Route path={'*'} element={<NotFound />} />
		</Route>
	)
)

function App(): JSX.Element {
	return (
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	)
}

export default App

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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='auth' element={<AuthLayout />} >
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<SignUp />} />
			</Route>
			<Route path={'/'} element={<RootLayout />} >
				<Route index element={<Home />} />
			</Route>

			<Route path={'*'} element={<NotFound />} />
		</Route>
	)
)

function App() {
	return <RouterProvider router={router} />
}

export default App

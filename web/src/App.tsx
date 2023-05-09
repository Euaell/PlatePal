import './App.css'

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route, RouterProvider,
} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/login' element={<Login />} />
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

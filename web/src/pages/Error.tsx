import { Link } from "react-router-dom";

export function ErrorPage() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="mt-6 text-center">
				<h1 className="text-4xl font-extrabold text-red-600">Error</h1>
				<p className="mt-2 text-lg font-medium text-gray-900">
				Something went wrong.
				</p>
				<div className="mt-8 flex justify-center">
					<div className="inline-flex rounded-md shadow">
						<Link to="/">
							<button
							className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							// startIcon={<IoMdArrowRoundBack />}
							>
							Go back home
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
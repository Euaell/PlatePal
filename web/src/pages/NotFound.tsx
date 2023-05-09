import { Link } from "react-router-dom";
import { JSX } from "react";

export default function NotFound(): JSX.Element {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/notFound.jpg')" }}>
			<h1 className="text-4xl font-bold mb-4">404</h1>
			<p className="text-lg font-medium mb-4">Oops! The page you're looking for doesn't exist.</p>
			<Link to="/" className="py-2 px-4 inline-block box-border text-yellow-300">
				Go back to home
			</Link>
		</div>
	);
}
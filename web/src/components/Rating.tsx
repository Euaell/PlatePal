import { JSX } from "react";

export default function Rating({ rating }: { rating: number }): JSX.Element {
	return (
		<div className="rating">
			<p className="font-light">Rating: <span className='font-extrabold'> {rating}/5 </span> </p>
		</div>
	)
}

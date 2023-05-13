import { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default class Home extends Component<NonNullable<unknown>, NonNullable<unknown>> {

	getInsult() {
		axios.get("https://evilinsult.com/generate_insult.php?lang=en&type=json")
			.then((response) => {
				console.log(response.data.insult);
			})
			.catch(console.error);
	}

	render() {
		return (
			<div className="hero min-h-screen" style={{ backgroundImage: `url("/images/bgImage.jpg")`, width: "100%", marginLeft: 0 }}>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Hello there</h1>
						<p className="mb-5">
							Provident cupiditate voluptatem et in.
							Quaerat fugiat ut assumenda excepturi
							exercitationem quasi. In deleniti eaque
							aut repudiandae et a id nisi.
						</p>

						<Link to='/recipes'><button className="btn btn-primary">Get Started</button></Link>
					</div>
				</div>
			</div>
		);
	}
}
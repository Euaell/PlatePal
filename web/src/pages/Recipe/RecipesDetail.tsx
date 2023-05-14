import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_RECIPE } from "../../queries/queries.ts"
import { ErrorPage } from "../Error.tsx"
import useForm from "../../helpers/useForm.ts"
import { apiEndpoint, ENDPOINTS } from "../../helpers/api";
import Rating from "../../components/Rating.tsx";

export default function RecipesDetail(): JSX.Element {
	const { recipeID } = useParams()
	const { data, loading, error, refetch } = useQuery(GET_RECIPE, {
		variables: {
			id: recipeID
		}
	})

	if (loading)
		return <div>Loading ... </div>

	if (error) {
		console.log(error.message)
		return <ErrorPage />
	}

	// console.log(data.recipe)

	return (
		<div className='min-h-screen min-w-screen bg-amber-100/20'>
			<h1 className='text-4xl text-center'>{data.recipe.Name}</h1>
			<div className='flex flex-col justify-center'>
				{/*Description*/}
				<div className='flex flex-col justify-center p-4 min-w-fit'>
					<p className='text-lg text-center'>By: {data.recipe.User.Username}</p>
					<div className='text-center'>
						<Rating rating={data.recipe.Rating} />
					</div>
					<br/>
					<p className='text-lg'>{data.recipe.Description}</p>
				</div>

				{/*	Image Carousel*/}
				{data.recipe.Images?.length ?
					<div className="carousel carousel-center min-w-md p-4 space-x-3 bg-neutral mx-9 rounded-box">
						{data.recipe.Images.map((image: string, index: number) => (
							<div className="carousel-item" key={index}>
								<img src={image} className="rounded-box" alt='Recipe Image'/>
							</div>
						))}
					</div> :
					null
				}

				{/*	Ingredients*/}
				<div className='p-4 max-w-md'>
					<h2 className='text-2xl'>Ingredients</h2>
					<ul className='list-disc list-inside'>
						{data.recipe.Ingredients.map((ingredient: string, index: number) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
				</div>

				{/*	Steps */}
				<div className='flex flex-col justify-center p-4 max-w-lg'>
					<h2 className='text-2xl'>Steps</h2>
					<ol className='list-decimal list-inside li'>
						{data.recipe.Steps.map((step: string, index: number) => (
							<li key={index}>{step}</li>
						))}
					</ol>
				</div>

				{/*	Reviews*/}
				<div className='flex flex-col justify-center p-4 max-w-md'>
					<h2 className='text-2xl'>Reviews</h2>
					<div className="artboard artboard-horizontal phone-4 bg-base-200/30 rounded-box overflow-auto">
						{data.recipe.Reviews.map((review: any, index: number) => (
							<div className="card" key={index}>
								<div className="card-body">
									<h2 className="card-title">{review.User.Username}</h2>
									<Rating rating={review.Rating} />
									<p>{review.Comment}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/*	Add Review*/}
				<AddReview RecipeID={recipeID} refetch={refetch}/>

			</div>
		</div>
	)
}

const AddReviewModel = (recipeId: string) => ({
	Comment: "",
	Rating: 0,
	RecipeID: recipeId
})

function AddReview({ RecipeID, refetch }: any): JSX.Element {
	const { values, setValues, handleChange, handleSubmit } = useForm(AddReviewModel(RecipeID), submitReview)

	function submitReview(values: any) {
		console.log(values)
		apiEndpoint(ENDPOINTS.reviews.addReview)
			.post(values)
			.then((res) => {
				console.log(res)
				refetch()
				setValues(AddReviewModel(RecipeID))
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div className='flex flex-col justify-center p-4 max-w-md'>
			<h2 className='text-2xl'>Add Review</h2>
			<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
				{/* Rating */}
				<div className="form-control">
					<label className="label" htmlFor='Rating'>
						<span className="label-text">Rating</span>
					</label>
					<div className="rating" id='Rating'>
						<input type="radio" name="Rating" value={1} onChange={handleChange} className="mask mask-star" />
						<input type="radio" name="Rating" value={2} onChange={handleChange} className="mask mask-star" />
						<input type="radio" name="Rating" value={3} onChange={handleChange} className="mask mask-star" />
						<input type="radio" name="Rating" value={4} onChange={handleChange} className="mask mask-star" />
						<input type="radio" name="Rating" value={5} onChange={handleChange} className="mask mask-star" />
					</div>
				</div>

				{/* Comment */}
				<div className="form-control">
					<label className="label" htmlFor='Comment'>
						<span className="label-text">Comment</span>
					</label>
					<textarea id='Comment' name='Comment' className="textarea h-24 textarea-bordered" placeholder="Enter your comment here..." value={values.Comment} onChange={handleChange}/>
				</div>

				<button type='submit' className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

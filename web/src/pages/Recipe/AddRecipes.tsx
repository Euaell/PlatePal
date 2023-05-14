import useForm from "../../helpers/useForm.ts";
import { ChangeEvent, useState } from "react";
import {  apiEndpoint, ENDPOINTS } from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import {GET_RECIPES} from "../../queries/queries.ts";

const AddRecipeModel = () => ({
	Name: "",
	Description: "",
	Ingredients: [],
	Steps: [],
	Images: Array<string>()
})
export default function AddRecipes() {
	const client = useApolloClient()
	const { values, setValues, handleChange, handleSubmit } = useForm(AddRecipeModel(), create)
	const [buttonActive, setButtonActive] = useState(false)

	const navigate = useNavigate()
	function handleSplit(e: ChangeEvent<HTMLTextAreaElement>) {
		const value = e.target.value.split('\n')
		const name = e.target.name
		setValues({...values, [name]: value})
	}

	async function handleImages(e: ChangeEvent<HTMLInputElement>) {
		const files: File[] = Array.from(e.target.files as FileList)
		const formData: FormData = new FormData()
		await Promise.all(files.map(async (file) => {
			formData.append('Images', file)
		}))

		apiEndpoint(ENDPOINTS.images.multiple)
			.post(formData)
			.then(res => {
				return res.data.data
			})
			.then(async data => {
				console.log(data)
				await Promise.all(data.map(async (image: any) => {
					values.Images.push(image.secure_url as string)
				}))
				setButtonActive(true)
			})
			.catch(err => {
				console.log(err)
			})
	}

	function create(value: any) {
		console.log("Create: ", value)

		// normal way
		apiEndpoint(ENDPOINTS.recipes.addRecipe)
			.post(value)
			.then(res => {
				console.log(res)
				client.refetchQueries({include: [{
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					query: GET_RECIPES
					}]})
				navigate('/recipes')
			})
			.catch(console.error)
	}

	return (
		<div className="hero min-h-screen min-w-full flex flex-col items-center space-y-8 w-full " style={{ backgroundImage: `url("/images/bgImage.jpg")`, backgroundSize: 'cover', width: "100%" }}>
			<div className="card w-96 bg-amber-100/90 shadow-xl my-9" style={{ width: "50%"}}>

				<div className="card-body items-center text-center">
					<h2 className="card-title">Add Recipe</h2>
					<form className="flex flex-col w-full" onSubmit={handleSubmit}>

						<div className="form-control w-full">
							<label className="label" htmlFor="Name">
								<span className="label-text">Recipe Name</span>
							</label>
							<input id="Name" name="Name" value={values.Name} type="text" placeholder="Recipe Name" className="input input-bordered" onChange={handleChange} required/>
						</div>

						<div className="form-control">
							<label className="label" htmlFor="Description">
								<span className="label-text">Description</span>
							</label>
							<textarea required id="Description" name="Description" value={values.Description} onChange={handleChange} placeholder="Description" className="textarea h-24 textarea-bordered" />
						</div>

						<div className="form-control">
							<label className="label" htmlFor="Ingredients">
								<span className="label-text">Ingredients</span>
							</label>
							<textarea required id="Ingredients" name="Ingredients" value={values.Ingredients.join('\n')} onChange={handleSplit} placeholder="Ingredients" className="textarea h-24 textarea-bordered"></textarea>
						</div>

						<div className="form-control">
							<label className="label" htmlFor="Steps">
								<span className="label-text">Steps</span>
							</label>
							<textarea required id="Steps" name="Steps" value={values.Steps.join('\n')} onChange={handleSplit} placeholder="Steps" className="textarea h-24 textarea-bordered"></textarea>
						</div>

						<div className="form-control">
							<label className="label" htmlFor="Images">
								<span className="label-text">Images</span>
							</label>
							<input
								type="file"
								id="Images"
								name='Images'
								// value={values.Images}
								onChange={handleImages}
								className="file-input file-input-bordered file-input-accent"
								accept="image/*"
								multiple
								required
							/>
							<label className="label">
								<span className='label-text-alt'>Images</span>
							</label>
						</div>

						<br />

						<button type='submit' className={buttonActive ? "btn btn-primary" : "btn btn-primary btn-disabled"}>Submit</button>

					</form>
				</div>
			</div>
		</div>
	)
}

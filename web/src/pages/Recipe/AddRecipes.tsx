import useForm from "../../helpers/useForm.ts";
import { ChangeEvent } from "react";
import {apiEndpoint, ENDPOINTS} from "../../helpers/api";

const AddRecipeModel = () => ({
	Name: "",
	Description: "",
	Ingredients: [""],
	Steps: [],
	Images: []
})
export default function AddRecipes() {
	const { values, setValues, handleChange, handleSubmit } = useForm(AddRecipeModel(), create)

	function handleSplit(e: ChangeEvent<HTMLTextAreaElement>) {
		const value = e.target.value.split('\n')
		const name = e.target.name
		setValues({...values, [name]: value})
	}

	function handleImages(e: ChangeEvent<HTMLInputElement>) {
		console.log("handle Images")
		apiEndpoint(ENDPOINTS.images.multiple)
			.post({ Images: e.target.files })
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	function create(value: any) {
		console.log("Create: ", value)
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
							<input id="Name" name="Name" value={values.Name} type="text" placeholder="Recipe Name" className="input input-bordered" onChange={handleChange}/>
						</div>

						<div className="form-control">
							<label className="label" htmlFor="Description">
								<span className="label-text">Description</span>
							</label>
							<textarea id="Description" name="Description" value={values.Description} onChange={handleChange} placeholder="Description" className="textarea h-24 textarea-bordered" />
						</div>

						<div className="form-control">
							<label className="label" htmlFor="Ingredients">
								<span className="label-text">Ingredients</span>
							</label>
							<textarea id="Ingredients" name="Ingredients" value={values.Ingredients.join('\n')} onChange={handleSplit} placeholder="Ingredients" className="textarea h-24 textarea-bordered"></textarea>
						</div>

						<div className="form-control">
							<label className="label" htmlFor="Steps">
								<span className="label-text">Steps</span>
							</label>
							<textarea id="Steps" name="Steps" value={values.Steps.join('\n')} onChange={handleSplit} placeholder="Steps" className="textarea h-24 textarea-bordered"></textarea>
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
							/>
							<label className="label">
								<span className='label-text-alt'>Images</span>
							</label>
						</div>

						<br />

						<button type='submit' className="btn btn-primary">Submit</button>

					</form>
				</div>
			</div>
		</div>
	)
}

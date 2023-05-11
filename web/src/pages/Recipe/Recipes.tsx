import {useQuery} from "@apollo/client";
import {GET_RECIPES} from "../../queries/queries.ts";

export default function Recipes() {
	const { data, loading, error } = useQuery(GET_RECIPES)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>

	return (
		<div className="hero min-h-screen min-w-full flex flex-col items-center space-y-8 w-full ">
			<h1 className="text-3xl font-semibold">Recipes</h1>

			<div className="grid grid-cols-2 gap-4" style={{backgroundImage: `url("/images/bgImage.jpg")`, backgroundSize: 'cover', width: "100%"}}>
				{data.recipes.map((recipe: any) => (
					<div key={recipe.id} className="flex flex-col justify-between bg-base-200/80 w-96 m-3 rounded-2xl">
						<div>
							{/*Image Carousel*/}
							<div className="carousel rounded-box rounded-b-none w-96">
								<div className="carousel-item w-1/2">
									<img src="/images/PlaceHolder.jpg" className="w-full" alt='Placeholder Image' />
								</div>

								{recipe.Images.map((image: string, index: number) =>
									<div key={index} className="carousel-item w-1/2">
										<img src={image} className="w-full"  alt='Recipe Image'/>
									</div>
								)}
							</div>
							<div className="divider"></div>

							{/*Recipe Name*/}
							<h2 className="text-lg text-center font-semibold mt-2">{recipe.Name}</h2>
							<div className="divider"></div>

							{/*Description*/}
							<Collapsable title={"Description"} >
								<p className="text-gray-500">{recipe.Description}</p>
							</Collapsable>

							{/*Ingredients*/}
							<Collapsable title={"Ingredients"}>
								<ul className='list-disc p-4'>
									{recipe.Ingredients.map((ingredient: string, index: number) =>
										<li key={index}>{ingredient}</li>
									)}
								</ul>
							</Collapsable>

							{/*	Steps*/}
							<Collapsable title={"Steps"}>
								<ol className='list-decimal p-4'>
									{recipe.Steps.map((step: string, index: number) =>
										<li key={index}>{step}</li>
									)}
								</ol>
							</Collapsable>

						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export function Collapsable({title, children} : {title: string, children: JSX.Element}) {
	return (
		<div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100">
			<div className="collapse-title text-xl font-medium">
				{title}
			</div>
			<div className="collapse-content">
				{children}
			</div>
		</div>
	)
}

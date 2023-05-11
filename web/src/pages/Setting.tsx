

export default function Setting() {

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log("Submit");
	}

	return (
		<div className="flex flex-col space-y-8 justify-start items-center mt-10">
			<h2 className="text-xl font-bold">Settings</h2>
			<form className="flex flex-col items-start rounded-2xl space-y-4 bg-secondary-focus/10 w-4/5 p-5" onSubmit={handleSubmit}>
				<label className="text-lg font-semibold">Name</label>
				<input
					type="text"
					className="form-control w-1/4"
					// value={name}
					// onChange={handleNameChange}
				/>
				<label className="text-lg font-semibold">Email</label>
				<input
					type="email"
					className="form-control w-full"
					// value={email}
					// onChange={handleEmailChange}
				/>
				<button className='btn btn-secondary' type="submit">
					Save Changes
				</button>
			</form>
		</div>
	)
}
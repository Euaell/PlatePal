

export default function Setting() {

	function handleSubmit() {

	}

	return (
		<div className="flex flex-col space-y-8">
			<h2 className="text-xl font-semibold">Settings</h2>
			<form className="flex flex-col items-start space-y-4" onSubmit={handleSubmit}>
				<label className="text-lg font-semibold">Name</label>
				<input
					type="text"
					className="form-control"
					// value={name}
					// onChange={handleNameChange}
				/>
				<label className="text-lg font-semibold">Email</label>
				<input
					type="email"
					className="form-control"
					// value={email}
					// onChange={handleEmailChange}
				/>
				<button color="primary" type="submit">
					Save Changes
				</button>
			</form>
		</div>
	)
}
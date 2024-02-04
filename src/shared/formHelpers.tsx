export function setFormInput<T>(
	e: React.ChangeEvent<HTMLInputElement>,
	setState: React.Dispatch<React.SetStateAction<T>>,
) {
	setState((prevFormData) => ({
		...prevFormData,
		[e.target.name]: e.target.value,
	}));
}

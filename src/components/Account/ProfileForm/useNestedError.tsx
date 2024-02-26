import axios from 'axios';

const useNestedError = (error: Error | null) => {
	const defaultError = 'Oops! There was an error.';
	if (axios.isAxiosError(error)) {
		return error?.response ? error?.response.data?.error : defaultError;
	} else {
		return defaultError;
	}
};

export default useNestedError;

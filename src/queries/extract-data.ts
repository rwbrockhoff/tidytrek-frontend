import { AxiosResponse } from 'axios';

// Extracts data from Tidytrek API response - used with SimpleMutation

type APIResponse<T> = {
	success: boolean;
	data: T;
	message?: string;
};

export const extractData = <T>(response: AxiosResponse<APIResponse<T>>): T => {
	return response.data.data;
};
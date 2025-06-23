import axios from 'axios';
export const frontendURL =
	process.env.NODE_ENV === 'production' ? 'https://tidytrek.co' : 'http://localhost:5173';

export const baseURL =
	process.env.NODE_ENV === 'production'
		? 'https://api.tidytrek.co'
		: 'http://localhost:4001';

export const tidyTrekAPI = axios.create({
	baseURL,
	withCredentials: true,
});

import axios from 'axios';

export const tidyTrekAPI = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://api.tidytrek.co'
			: 'http://localhost:4001',
	withCredentials: true,
});

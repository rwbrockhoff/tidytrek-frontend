import axios from 'axios';

export const tidyTrekAPI = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://api.tidytrek.co'
			: 'http://localhost:4001',
	withCredentials: true,
});

tidyTrekAPI.interceptors.request.use(
	(config) => {
		const token = getToken();
		config.headers['Authorization'] = `Bearer ${token || ''}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

const getToken = () => {
	// Fetch token stored in localStorage by Supabase
	const storageKey = import.meta.env.VITE_STORAGE_KEY;
	const sessionDataString = localStorage.getItem(storageKey);
	const sessionData = JSON.parse(sessionDataString || 'null');
	const token = sessionData?.access_token;

	return token;
};

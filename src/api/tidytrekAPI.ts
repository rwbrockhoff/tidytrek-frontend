import axios from 'axios';
import supabase from './supabaseClient';

export const frontendURL =
	process.env.NODE_ENV === 'production'
		? 'https://api.tidytrek.co'
		: 'http://localhost:5173';

const baseURL =
	process.env.NODE_ENV === 'production'
		? 'https://api.tidytrek.co'
		: 'http://localhost:4001';

export const tidyTrekAPI = axios.create({
	baseURL,
	withCredentials: true,
});

tidyTrekAPI.interceptors.request.use(
	async (config) => {
		const token = await getToken();
		config.headers['Authorization'] = `Bearer ${token || ''}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

const getToken = async () => {
	// Fetch token stored in localStorage by Supabase
	const storageKey = import.meta.env.VITE_STORAGE_KEY;
	const sessionDataString = localStorage.getItem(storageKey);
	const sessionData = JSON.parse(sessionDataString || 'null');
	const isExpired = getExpiration(sessionData?.expires_at);
	// refetch new token if expired before request
	if (isExpired) {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		return session?.access_token;
	} else {
		return sessionData?.access_token;
	}
};

const getExpiration = (expiresAt: number) => {
	const expires = expiresAt ? new Date(expiresAt * 1000) : null;
	return expires ? expires < new Date() : '3';
};

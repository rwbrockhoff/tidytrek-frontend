import axios from 'axios';

export const frontendURL =
	process.env.NODE_ENV === 'production' ? 'https://tidytrek.co' : 'http://localhost:5173';

export const baseAppURL =
	process.env.NODE_ENV === 'production'
		? 'https://app.tidytrek.co'
		: 'http://localhost:5173';

const baseUrlMap = {
	development: 'http://localhost:4001',
	test: 'http://localhost:4002',
	production: 'https://api.tidytrek.co',
} as const;

export const baseURL =
	baseUrlMap[(process.env.NODE_ENV as keyof typeof baseUrlMap) || 'development'];

export const tidyTrekAPI = axios.create({
	baseURL,
	withCredentials: true,
});

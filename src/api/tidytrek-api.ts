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

// Handle 401 errors globally
tidyTrekAPI.interceptors.response.use(
	(response) => response,
	(error) => {
		// Redirect to login on 401 Unauthorized
		if (error.response?.status === 401) {
			// Avoid redirect loops if already on login page
			if (!window.location.pathname.includes('/login')) {
				window.location.href = '/login';
			}
		}
		// Pass on other error types
		return Promise.reject(error);
	},
);

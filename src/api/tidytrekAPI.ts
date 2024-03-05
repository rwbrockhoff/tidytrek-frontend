import axios from 'axios';

export const tidyTrekAPI = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://api.tidytrek.co'
			: 'http://localhost:4001',
	withCredentials: true,
});

// tidyTrekAPINoAuth.interceptors.request.use(
// 	(config) => {
// 		const authToken = localStorage.getItem('sb-pnfcatjvbwxdkapaprsb-auth-token');
// 		const { access_token } = authToken ? JSON.parse(authToken) : null;

// 		config.headers['Authorization'] = `Bearer ${access_token ? access_token : ''}`;
// 		return config;
// 	},
// 	(error) => {
// 		console.log('Config Error: ', error);
// 		return Promise.reject(error);
// 	},
// );

import { type Location } from 'react-router-dom';

// Required for TS to work with useLocation
export const createMockLocation = (pathname = '/'): Location => ({
	pathname,
	search: '',
	hash: '',
	state: null,
	key: 'default',
});

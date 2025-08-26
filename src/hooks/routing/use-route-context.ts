import { useLocation } from 'react-router-dom';

const GUEST_ROUTE_PATTERNS = [
	'/pk/',
	'/u/',
];

export const useGuestRoute = () => {
	const location = useLocation();
	
	return GUEST_ROUTE_PATTERNS.some(pattern => 
		location.pathname.startsWith(pattern)
	);
};
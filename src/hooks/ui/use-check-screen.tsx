import { useEffect, useState } from 'react';

export const useCheckScreen = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	return { isMobile: width <= 768, isTablet: width <= 1280 };
};

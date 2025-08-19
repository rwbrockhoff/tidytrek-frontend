import { useState, useEffect } from 'react';

export const useDelayedView = (delay: number = 300) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, delay);

		return () => clearTimeout(timer);
	}, [delay]);

	return isVisible;
};
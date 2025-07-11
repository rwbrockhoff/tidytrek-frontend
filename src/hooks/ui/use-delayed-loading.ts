import { useState, useEffect } from 'react';

// Hook to delay showing loading state to prevent skeleton "flashing" on fast networks

export const useDelayedLoading = (isLoading: boolean, delay: number = 300): boolean => {
	const [showLoading, setShowLoading] = useState(false);

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		if (isLoading) {
			// Start timer to show loading after delay
			timeoutId = setTimeout(() => {
				setShowLoading(true);
			}, delay);
		} else {
			// Hide loading when loading finishes
			setShowLoading(false);
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [isLoading, delay]);

	return showLoading;
};

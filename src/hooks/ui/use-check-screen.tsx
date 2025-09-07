import { useState, useEffect, useCallback } from 'react';

const MOBILE_BREAKPOINT = 768;
const MEDIUM_BREAKPOINT = 1280;

export function useCheckScreen() {
	const [screenState, setScreenState] = useState(() => {
		if (typeof window === 'undefined') {
			return { isMobile: false, isMedium: false };
		}
		const width = document.documentElement.clientWidth;
		return {
			isMobile: width <= MOBILE_BREAKPOINT,
			isMedium: width <= MEDIUM_BREAKPOINT,
		};
	});

	const updateScreenState = useCallback(() => {
		const width = document.documentElement.clientWidth;

		setScreenState((prev) => {
			const newState = {
				isMobile: width <= MOBILE_BREAKPOINT,
				isMedium: width <= MEDIUM_BREAKPOINT,
			};
			// Prevent re-renders
			if (prev.isMobile === newState.isMobile && prev.isMedium === newState.isMedium) {
				return prev;
			}
			return newState;
		});
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		// Use ResizeObserver
		const resizeObserver = new ResizeObserver(updateScreenState);
		resizeObserver.observe(document.documentElement);

		// Close connection on unmount
		return () => {
			resizeObserver.disconnect();
		};
	}, [updateScreenState]);

	return screenState;
}

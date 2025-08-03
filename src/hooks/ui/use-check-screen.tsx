import { useLayoutEffect, useState } from 'react';
import { useDebounce } from '../utils/use-debounce';

const MOBILE_BREAKPOINT = 768;
const MEDIUM_BREAKPOINT = 1280;

export const useCheckScreen = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const debouncedWidth = useDebounce(width, 100);

	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	};

	//synchronous, before first paint
	useLayoutEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	// hook still fires/updates for resizing
	// values for components use debounced width to avoid excess re-renders
	return {
		isMobile: debouncedWidth <= MOBILE_BREAKPOINT,
		isMedium: debouncedWidth <= MEDIUM_BREAKPOINT,
	};
};

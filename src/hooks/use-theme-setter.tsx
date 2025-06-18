import { useEffect } from 'react';

export function useThemeSetter(theme: 'dark' | 'light') {
	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
		document.body.setAttribute('data-theme-palette', 'earth-tones');
	}, [theme]);
}
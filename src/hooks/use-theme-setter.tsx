import { useEffect } from 'react';

export function useThemeSetter(theme: 'dark' | 'light') {
	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
	}, [theme]);
}
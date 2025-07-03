import { useEffect, useState } from 'react';

export function useThemeSetter(darkMode?: boolean, themeName?: string) {
	const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

	const getPreferredTheme = (): 'light' | 'dark' => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
			return savedTheme as 'light' | 'dark';
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	useEffect(() => {
		// If user has database settings, use those; otherwise fall back to system preference

		let themeToUse: 'light' | 'dark';
		const paletteToUse = themeName || 'earth-tones';

		if (darkMode !== undefined) themeToUse = darkMode ? 'dark' : 'light';
		else themeToUse = getPreferredTheme();

		document.body.setAttribute('data-theme', themeToUse);
		document.body.setAttribute('data-theme-palette', paletteToUse);
		setCurrentTheme(themeToUse);
	}, [darkMode, themeName]);

	return currentTheme;
}

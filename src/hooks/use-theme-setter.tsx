import { useEffect, useState } from 'react';

export function useThemeSetter(darkMode?: boolean, paletteThemeName?: string) {
	const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

	const getPreferredTheme = (): 'light' | 'dark' => {
		const savedTheme = localStorage.getItem('theme');
		// Return saved theme
		if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
			return savedTheme as 'light' | 'dark';
		}
		// Or else match users browser preference
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	const getPreferredPalette = (): string => {
		const savedPalette = localStorage.getItem('palette');
		// Return saved palette
		if (savedPalette) return savedPalette;

		// Return default option as fallback
		return 'earth-tones';
	};

	useEffect(() => {
		// If user has database settings, use those; otherwise fall back to system preference
		let themeToUse: 'light' | 'dark'; // ts
		let paletteToUse = 'earth-tones';

		if (darkMode !== undefined) themeToUse = darkMode ? 'dark' : 'light';
		else themeToUse = getPreferredTheme();

		if (paletteThemeName) paletteToUse = paletteThemeName;
		else paletteToUse = getPreferredPalette();

		document.body.setAttribute('data-theme', themeToUse);
		document.body.setAttribute('data-theme-palette', paletteToUse);
		setCurrentTheme(themeToUse);
	}, [darkMode, paletteThemeName]);

	return currentTheme;
}

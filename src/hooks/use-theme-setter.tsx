import { useEffect, useState } from 'react';
import { DEFAULT_PALETTE } from '@/types/settings-types';

export function useThemeSetter(darkMode?: boolean, palette?: string) {
	const [currentMode, setCurrentMode] = useState<'light' | 'dark'>('light');
	const [currentPalette, setCurrentPalette] = useState(DEFAULT_PALETTE);

	const getPreferredMode = (): 'light' | 'dark' => {
		const savedMode = localStorage.getItem('theme');
		// Return saved mode
		if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
			return savedMode as 'light' | 'dark';
		}
		// Or else match users browser preference
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	const getPreferredTheme = (): string => {
		const savedTheme = localStorage.getItem('palette');
		// Return saved theme
		if (savedTheme) return savedTheme;

		// Return default option as fallback
		return DEFAULT_PALETTE;
	};

	useEffect(() => {
		// If user has database settings, use those; otherwise fall back to system preference
		let modeToUse = currentMode;
		let themeToUse = currentPalette;

		if (darkMode !== undefined) modeToUse = darkMode ? 'dark' : 'light';
		else modeToUse = getPreferredMode();

		if (palette) themeToUse = palette;
		else themeToUse = getPreferredTheme();

		document.body.setAttribute('data-theme', modeToUse);
		document.body.setAttribute('data-theme-palette', themeToUse);

		setCurrentMode(modeToUse);
		setCurrentPalette(themeToUse);
	}, [darkMode, palette]);

	return { currentMode, currentPalette };
}

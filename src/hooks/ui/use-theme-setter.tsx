import { useEffect, useState } from 'react';
import {
	DEFAULT_PALETTE,
	PaletteName,
	PALETTE_NAMES,
} from '@/styles/palette/palette-constants';

export function useThemeSetter(darkMode?: boolean, palette?: PaletteName) {
	const [currentMode, setCurrentMode] = useState<'light' | 'dark'>('light');
	const [currentPalette, setCurrentPalette] = useState<PaletteName>(DEFAULT_PALETTE);

	const getPreferredMode = (): 'light' | 'dark' => {
		const savedMode = localStorage.getItem('theme');
		// Return saved mode
		if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
			return savedMode as 'light' | 'dark';
		}
		// Or else match users browser preference
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	const getPreferredTheme = (): PaletteName => {
		const savedTheme = localStorage.getItem('palette');
		// Return saved theme if valid
		if (savedTheme && PALETTE_NAMES.includes(savedTheme as PaletteName)) {
			return savedTheme as PaletteName;
		}

		// Return default option as fallback
		return DEFAULT_PALETTE;
	};

	useEffect(() => {
		// If user has database settings, use those; otherwise fall back to system preference
		const modeToUse = darkMode !== undefined 
			? (darkMode ? 'dark' : 'light')
			: getPreferredMode();

		const themeToUse = palette || getPreferredTheme();

		// Always update DOM attributes to ensure portals get the changes
		document.documentElement.setAttribute('data-theme', modeToUse);
		document.body.setAttribute('data-theme', modeToUse);
		document.body.setAttribute('data-theme-palette', themeToUse);

		setCurrentMode(modeToUse);
		setCurrentPalette(themeToUse);
	}, [darkMode, palette]);

	return { currentMode, currentPalette };
}

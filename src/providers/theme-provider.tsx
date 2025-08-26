import React from 'react';
import { Theme } from '@radix-ui/themes';
import { useAuth } from '@/hooks/auth/use-auth';
import { useThemeSetter } from '@/hooks/ui/use-theme-setter';

type ThemeProviderProps = {
	children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const { settings } = useAuth();
	const { darkMode, palette } = settings || {};
	const { currentMode, currentPalette } = useThemeSetter(darkMode, palette);

	return (
		<div data-theme={currentMode} data-theme-palette={currentPalette}>
			<Theme accentColor="jade" radius="small" scaling="95%">
				{children}
			</Theme>
		</div>
	);
};
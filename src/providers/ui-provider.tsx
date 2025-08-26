import React from 'react';
import { ScreenProvider } from '@/contexts/screen-context';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from './theme-provider';

type UIProviderProps = {
	children: React.ReactNode;
};

export const UIProvider = ({ children }: UIProviderProps) => {
	return (
		<AuthProvider>
			<ScreenProvider>
				<ThemeProvider>
					{children}
				</ThemeProvider>
			</ScreenProvider>
		</AuthProvider>
	);
};
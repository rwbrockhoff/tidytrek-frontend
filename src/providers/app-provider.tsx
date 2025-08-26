import React from 'react';
import { ErrorProvider } from './error-provider';
import { QueryProvider } from './query-provider';
import { UIProvider } from './ui-provider';

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<React.StrictMode>
			<ErrorProvider>
				<QueryProvider>
					<UIProvider>{children}</UIProvider>
				</QueryProvider>
			</ErrorProvider>
		</React.StrictMode>
	);
};

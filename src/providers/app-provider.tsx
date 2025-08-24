import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { AppErrorFallback } from '@/components';
import { OfflineBanner } from '@/components/ui/offline-banner';
import { ScreenProvider } from '@/contexts/screen-context';
import { AuthProvider } from '@/contexts/auth-context';
import * as Sentry from '@sentry/react';
import { RETRY_COUNT, RETRY_DELAY } from '@/queries/query-config';

// Create query client instance
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: RETRY_COUNT,
			retryDelay: RETRY_DELAY,
			staleTime: 2 * 60 * 1000, // 2 min
			gcTime: 10 * 60 * 1000, // 10 min (cacheTime)
		},
	},
});

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<React.StrictMode>
			<Sentry.ErrorBoundary>
				<ErrorBoundary FallbackComponent={AppErrorFallback}>
					<QueryClientProvider client={queryClient}>
						<AuthProvider>
							<ScreenProvider>
								<OfflineBanner />
								{children}
								<ReactQueryDevtools initialIsOpen={false} />
							</ScreenProvider>
						</AuthProvider>
					</QueryClientProvider>
				</ErrorBoundary>
			</Sentry.ErrorBoundary>
		</React.StrictMode>
	);
};

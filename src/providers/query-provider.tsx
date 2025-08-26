import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RETRY_COUNT, RETRY_DELAY } from '@/queries/query-config';

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

type QueryProviderProps = {
	children: React.ReactNode;
};

export const QueryProvider = ({ children }: QueryProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
import './instrument';
import ReactDOM from 'react-dom/client';
import '@radix-ui/themes/styles.css';
import './styles/index.css';
import './index.css';
import { AppRouter } from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { AppErrorFallback } from './components';
import { OfflineBanner } from './components/ui/offline-banner';
import * as Sentry from '@sentry/react';
import { RETRY_COUNT, RETRY_DELAY } from './queries/query-config';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Sentry.ErrorBoundary>
		<ErrorBoundary FallbackComponent={AppErrorFallback}>
			<QueryClientProvider client={queryClient}>
				<OfflineBanner />
				<AppRouter />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ErrorBoundary>
	</Sentry.ErrorBoundary>,
);

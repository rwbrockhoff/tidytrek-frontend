import ReactDOM from 'react-dom/client';
// Import only the required css files from Radix
// import '@radix-ui/themes/tokens.css';
// import '@radix-ui/themes/components.css';
// import '@radix-ui/themes/utilities.css';
import '@radix-ui/themes/styles.css';
import './styles/theme/index.css';
import './index.css';
import { AppRouter } from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { AppErrorFallback } from './components';
import { RETRY_COUNT, RETRY_DELAY } from './queries/query-config';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: RETRY_COUNT,
			retryDelay: RETRY_DELAY,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ErrorBoundary FallbackComponent={AppErrorFallback}>
		<QueryClientProvider client={queryClient}>
			<AppRouter />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</ErrorBoundary>,
);

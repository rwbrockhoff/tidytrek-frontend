import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import '@radix-ui/themes/styles.css';
import { AppRouter } from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { AppErrorFallback } from './components';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
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

import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { AppWithRoutes } from '@/routes/app-with-routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<QueryClientProvider client={queryClient}>
			<AppWithRoutes />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</>,
);

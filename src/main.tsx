import './instrument';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/inter';
import '@radix-ui/themes/styles.css';
import './styles/index.css';
import './index.css';
import { AppRouter } from '@/routes';
import { AppProvider } from '@/providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<AppProvider>
		<AppRouter />
	</AppProvider>,
);

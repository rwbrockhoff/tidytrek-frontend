import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppWithRoutes from './views/Layout/AppWithRoutes';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<Provider store={store}>
			<AppWithRoutes />
		</Provider>
	</>,
);

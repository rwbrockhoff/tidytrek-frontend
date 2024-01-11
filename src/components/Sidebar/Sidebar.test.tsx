// @vitest-environment jsdom
import { render } from '../../tests/test-utils';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Sidebar from './Sidebar';

it('Should render the Sidebar component', () => {
  render(
    <Provider store={store}>
      <Sidebar />
    </Provider>,
  );
});

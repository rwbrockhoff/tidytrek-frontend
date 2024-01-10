// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Sidebar from './Sidebar';

it.todo('Should render the Sidebar component', () => {
  render(
    <Provider store={store}>
      <Sidebar />
    </Provider>,
  );
});

// @vitest-environment jsdom
import { wrappedRender } from '../../tests/test-utils';
import Sidebar from './Sidebar';

it('Should render the Sidebar component', () => {
  wrappedRender(<Sidebar />);
});

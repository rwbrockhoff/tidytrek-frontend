// @vitest-environment jsdom
import { wrappedRender } from '../../tests/test-utils';
import Sidebar from './Sidebar';

it.skip('Should render the Sidebar component', () => {
	wrappedRender(<Sidebar showSidebar={true} onToggle={() => null} />);
});

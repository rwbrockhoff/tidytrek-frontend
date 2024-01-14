import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const ViewLayout = () => {
  return (
    <div id="app-view-container">
      <Sidebar />
      <div id="view-component-container">
        <Outlet />
      </div>
    </div>
  );
};

export default ViewLayout;

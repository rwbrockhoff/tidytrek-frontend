import Navigation from "./components/Navigation/Navigation";
import { Outlet } from "react-router-dom";

const ViewLayout: React.FC = () => {
  return (
    <div id="app-view-container">
      <Navigation />
      <div id="view-component-container">
        <Outlet />
      </div>
    </div>
  );
};

export default ViewLayout;

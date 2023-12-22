import Navigation from "./components/Navigation/Navigation";
import { Outlet } from "react-router-dom";

const ViewLayout: React.FC = () => {
  return (
    <div className="app-view-container">
      <Navigation />
      <div className="view-component-container">
        <Outlet />
      </div>
    </div>
  );
};

export default ViewLayout;

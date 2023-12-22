import Navigation from "./components/Navigation/Navigation";
import { Outlet } from "react-router-dom";

const ViewLayout: React.FC = () => {
  return (
    <div className="app-view-container">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default ViewLayout;

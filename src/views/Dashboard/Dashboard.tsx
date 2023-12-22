import "./Dashboard.css";
import PackTable from "../../components/Dashboard/PackTable/PackTable";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <PackTable />
    </div>
  );
};

export default Dashboard;

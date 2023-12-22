import "./Dashboard.css";
import PackTable from "../../components/Dashboard/PackTable/PackTable";
import PackChart from "../../components/Dashboard/PackChart/PackChart";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <PackChart />
      <PackTable />
      <PackTable />
    </div>
  );
};

export default Dashboard;

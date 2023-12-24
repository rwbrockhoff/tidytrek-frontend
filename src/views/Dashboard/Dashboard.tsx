import "./Dashboard.css";
import PackTable from "../../components/Dashboard/PackTable/PackTable";
import PackChart from "../../components/Dashboard/PackChart/PackChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getPacks } from "../../redux/slices/packSlice";

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPack = {}] = useSelector(
    (state: RootState) => state.packs.packs
  );

  useEffect(() => {
    dispatch(getPacks());
  }, [dispatch]);

  const { categories = [] } = currentPack;
  return (
    <div className="dashboard-container">
      <PackChart />
      {categories.map((category: object, idx: number) => (
        <PackTable category={category} key={category?.packCategoryId || idx} />
      ))}
    </div>
  );
};

export default Dashboard;

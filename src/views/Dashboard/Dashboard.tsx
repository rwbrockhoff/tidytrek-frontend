import "./Dashboard.css";
import PackCategory from "../../components/Dashboard/PackCategory/PackCategory";
import PackChart from "../../components/Dashboard/PackChart/PackChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getPacks } from "../../redux/slices/packSlice";

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentPackId = useSelector(
    (state: RootState) => state.packs.currentPackId
  );
  const packs = useSelector((state: RootState) => state.packs.packs);
  const [currentPack = {}] = packs.filter(
    (item) => item.packId === currentPackId
  );

  useEffect(() => {
    dispatch(getPacks());
  }, [dispatch]);

  const packCategories = currentPack?.categories || [];
  return (
    <div className="dashboard-container">
      <PackChart />
      {packCategories.map((category: object, idx: number) => (
        <PackCategory
          category={category}
          key={category?.packCategoryId || idx}
        />
      ))}
    </div>
  );
};

export default Dashboard;

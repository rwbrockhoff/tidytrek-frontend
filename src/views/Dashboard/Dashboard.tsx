import "./Dashboard.css";
import PackCategory from "../../components/Dashboard/PackCategory/PackCategory";
import PackChart from "../../components/Dashboard/PackChart/PackChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getDefaultPack } from "../../redux/packs/packThunks";

interface Category {
  packCategoryName: string;
  packCategoryId: number;
  items: [];
}

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const packCategories = useSelector(
    (state: RootState) => state.packs.categories
  );

  useEffect(() => {
    dispatch(getDefaultPack());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <PackChart />
      {packCategories.length &&
        packCategories.map((category, idx: number) => (
          <PackCategory
            category={category}
            key={category?.packCategoryId || idx}
          />
        ))}
    </div>
  );
};

export default Dashboard;

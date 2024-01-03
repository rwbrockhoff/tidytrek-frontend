import "./Dashboard.css";
import PackCategory from "../../components/Dashboard/PackCategory/PackCategory";
import PackChart from "../../components/Dashboard/PackChart/PackChart";
import AddCategoryButton from "../../components/Dashboard/PackCategory/AddCategoryButton/AddCategoryButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getDefaultPack, addPackCategory } from "../../redux/packs/packThunks";

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const packCategories = useSelector(
    (state: RootState) => state.packs.categories
  );
  const packId = useSelector((state: RootState) => state.packs.pack.packId);

  useEffect(() => {
    dispatch(getDefaultPack());
  }, [dispatch]);

  const handleAddPackCategory = () => {
    dispatch(addPackCategory(packId));
  };

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
      <AddCategoryButton onClick={handleAddPackCategory} />
    </div>
  );
};

export default Dashboard;

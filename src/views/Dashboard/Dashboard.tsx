import "./Dashboard.css";
import PackInfo from "../../components/Dashboard/PackInfo/PackInfo";
import PackCategory from "../../components/Dashboard/PackCategory/PackCategory";
import AddCategoryButton from "../../components/Dashboard/PackCategory/AddCategoryButton/AddCategoryButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getDefaultPack,
  addPackCategory,
  movePackItem,
} from "../../redux/packs/packThunks";
import { DragDropContext } from "react-beautiful-dnd";

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

  const onDragEnd = (result) => {
    const { draggableId, destination, source } = result;
    if (!destination) {
      return;
    }
    const sameIndex = destination.index === source.index;
    const sameCategory = destination.droppableId === source.droppableId;

    if (sameIndex && sameCategory) return;

    dispatch(
      movePackItem({
        packItemId: draggableId,
        packCategoryId: destination.droppableId,
        packItemIndex: destination.index,
        prevPackCategoryId: source.droppableId,
        prevPackItemIndex: source.index,
      })
    );
  };

  return (
    <div className="dashboard-container">
      <PackInfo />

      <DragDropContext onDragEnd={onDragEnd}>
        {packCategories.length >= 0 &&
          packCategories.map((category, idx: number) => (
            <PackCategory
              category={category}
              index={idx}
              key={category?.packCategoryId || idx}
            />
          ))}
      </DragDropContext>

      <AddCategoryButton onClick={handleAddPackCategory} />
    </div>
  );
};

export default Dashboard;

import './Dashboard.css';
import PackInfo from '../../components/Dashboard/PackInfo/PackInfo';
import PackCategory from '../../components/Dashboard/PackCategory/PackCategory';
import AddCategoryButton from '../../components/Dashboard/PackCategory/TableButtons/AddCategoryButton/AddCategoryButton';
import { useParams } from 'react-router-dom';
import {
	useGetPackQuery,
	useAddPackCategoryMutation,
	useMovePackItemMutation,
} from '../../queries/packQueries';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Category, type Pack } from '../../types/packTypes';

const Dashboard = () => {
	const { mutate: addCategory } = useAddPackCategoryMutation();
	const { mutate: movePackItem } = useMovePackItemMutation();

	const { packId: paramPackId } = useParams();
	const { data, isPending } = useGetPackQuery(paramPackId);

	const packCategories = data?.categories || [];
	const currentPack = data?.pack || ({} as Pack);
	const packId = data?.pack.packId || null;

	const handleAddPackCategory = () => {
		packId && addCategory(packId);
	};

	const onDragEnd = (result: DropResult) => {
		const { draggableId, destination, source } = result;
		if (!destination) return;

		const sameIndex = destination.index === source.index;
		const sameCategory = destination.droppableId === source.droppableId;

		if (sameIndex && sameCategory) return;

		movePackItem({
			packId: paramPackId ? packId : null,
			packItemId: draggableId,
			packCategoryId: destination.droppableId,
			packItemIndex: destination.index,
			prevPackCategoryId: source.droppableId,
			prevPackItemIndex: source.index,
		});
	};

	return (
		<div className="dashboard-container">
			<PackInfo
				currentPack={currentPack}
				packCategories={packCategories}
				fetching={isPending}
			/>

			<DragDropContext onDragEnd={onDragEnd}>
				{packCategories.length >= 0 &&
					packCategories.map((category: Category, idx: number) => (
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

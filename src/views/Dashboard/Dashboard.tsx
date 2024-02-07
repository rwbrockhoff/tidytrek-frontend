import './Dashboard.css';
import PackInfo from '../../components/Dashboard/PackInfo/PackInfo';
import PackCategory from '../../components/Dashboard/PackCategory/PackCategory';
import { AddCategoryButton } from '../../components/Dashboard/PackCategory/TableButtons/TableButtons';
import { useParams } from 'react-router-dom';
import {
	useGetPackQuery,
	useGetPackListQuery,
	useAddPackCategoryMutation,
	useMovePackItemMutation,
	useMovePackCategoryMutation,
} from '../../queries/packQueries';
import { Drop, DragDropContext, type DropResult } from '../../shared/DragDropWrapper';
import { Category, type Pack } from '../../types/packTypes';

const Dashboard = () => {
	const { mutate: addCategory } = useAddPackCategoryMutation();
	const { mutate: movePackItem } = useMovePackItemMutation();
	const { mutate: movePackCategory } = useMovePackCategoryMutation();

	const { packId: paramPackId } = useParams();
	const { data, isPending } = useGetPackQuery(paramPackId);
	const { data: packListData } = useGetPackListQuery();
	const { packList } = packListData || { packList: [] };

	const packCategories = data?.categories || [];
	const currentPack = data?.pack || ({} as Pack);
	const packId = data?.pack.packId || null;

	const handleAddPackCategory = () => {
		packId && addCategory(packId);
	};

	const onDragItemEnd = (result: DropResult) => {
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

	const onDragCategoryEnd = (result: DropResult) => {
		const { draggableId, destination, source } = result;
		if (!destination) return;

		const sameIndex = destination.index === source.index;
		if (sameIndex) return;

		movePackCategory({
			packId: destination.droppableId,
			packCategoryId: draggableId,
			prevIndex: source.index,
			newIndex: destination.index,
		});
	};

	return (
		<div className="dashboard-container">
			<PackInfo
				currentPack={currentPack}
				packCategories={packCategories}
				fetching={isPending}
			/>

			<DragDropContext onDragEnd={onDragCategoryEnd}>
				<Drop droppableId={packId}>
					{packCategories.length >= 0 &&
						packCategories.map((category: Category, idx: number) => (
							<PackCategory
								category={category}
								packList={packList}
								onDragItem={onDragItemEnd}
								index={idx}
								key={category?.packCategoryId || idx}
							/>
						))}
				</Drop>
			</DragDropContext>

			<AddCategoryButton onClick={handleAddPackCategory} />
		</div>
	);
};

export default Dashboard;

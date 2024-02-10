import './Dashboard.css';
import PackInfo from '../../components/Dashboard/PackInfo/PackInfo';
import PackCategory from '../../components/Dashboard/PackCategory/PackCategory';
import { AddCategoryButton } from '../../components/Dashboard/PackCategory/TableButtons/TableButtons';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { UserViewContext } from './useUserContext';
import {
	useGetPackQuery,
	useGetPackListQuery,
	useAddPackCategoryMutation,
	useMovePackItemMutation,
	useMovePackCategoryMutation,
} from '../../queries/packQueries';
import { useViewPackQuery } from '../../queries/guestQueries';
import { type Category, type Pack } from '../../types/packTypes';
import DashboardFooter from '../../components/Dashboard/DashboardFooter/DashboardFooter';
import {
	type DragStartEvent,
	type DragEndEvent,
	type DragOverEvent,
	type Active,
	DndContext,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
	sensors,
	DragOverlay,
	isTask,
	getIdx,
	sortedCategoryIds,
} from '../../shared/DragDropKit';
import { getCategoryIdx } from '../../utils/packUtils';

type DashboardProps = { userView: boolean };

const Dashboard = ({ userView }: DashboardProps) => {
	const [activeItem, setActiveItem] = useState<Active | null>(null);

	const { mutate: addCategory } = useAddPackCategoryMutation();
	const { mutate: movePackItem } = useMovePackItemMutation();
	const { mutate: movePackCategory } = useMovePackCategoryMutation();

	const { packId: paramPackId } = useParams();
	const { data, isPending } = userView
		? useGetPackQuery(paramPackId)
		: useViewPackQuery(paramPackId);

	const { data: packListData } = userView
		? useGetPackListQuery()
		: { data: { packList: [] } };
	const { packList } = packListData || { packList: [] };

	let packCategories = data?.categories || [];
	const currentPack = data?.pack || ({} as Pack);
	const packId = data?.pack.packId || null;

	const handleAddPackCategory = () => {
		packId && addCategory(packId);
	};

	const handleOnDragItemEnd = (result: DragEndEvent) => {
		const { active, over } = result;
		if (!over || !active) return;

		const isOverATask = isTask(over);
		const packItemId = Number(active.id);

		const prevPackItemIndex = active.data.current?.packItem.packItemIndex;
		const packCategoryId = isOverATask ? over.data.current?.packCategoryId : over.id;
		const packItemIndex = isOverATask ? getIdx(over) : 0;

		movePackItem({
			packId: currentPack.packId,
			packItemId,
			packCategoryId,
			packItemIndex,
			prevPackItemIndex,
		});
	};

	const handleOnDragStart = ({ active }: DragStartEvent) => {
		isTask(active) && setActiveItem(active);
	};

	const handleOnDragEnd = (result: DragEndEvent) => {
		setActiveItem(null);
		const { active, over } = result;
		if (isTask(active)) return handleOnDragItemEnd(result);

		if (!over) return;
		if (active.id === over.id) return;

		const prevIndex = getIdx(active);
		const newIndex = getIdx(over);
		const packCategoryId = Number(active.id);

		movePackCategory({
			packId: currentPack.packId,
			packCategoryId,
			prevIndex,
			newIndex,
		});
	};

	const handleOnDragOver = (result: DragOverEvent) => {
		const { active, over } = result;

		if (!over) return;
		if (active.id === over.id) return;

		const isActiveATask = isTask(active);
		const isOverATask = isTask(over);
		if (!isActiveATask) return;

		const newCategoryId = isOverATask
			? over.data.current?.packCategoryId
			: over.data.current?.category.packCategoryId;
		const currentCategoryId = active.data.current?.packCategoryId;

		if (currentCategoryId === newCategoryId && !isOverATask) return;

		const currentCategoryIndex = getCategoryIdx(packCategories, currentCategoryId);
		const newCategoryIndex = getCategoryIdx(packCategories, newCategoryId);

		const packItemIndex = getIdx(active);
		const newIndex = isOverATask ? getIdx(over) : 0;

		if (currentCategoryId !== newCategoryId || packItemIndex !== newIndex) {
			const newId = Number(newCategoryId);
			const modifiedItem = { ...active.data.current?.packItem };
			modifiedItem['packCategoryId'] = newId;

			packCategories[currentCategoryIndex].packItems.splice(packItemIndex, 1);
			packCategories[newCategoryIndex].packItems.splice(newIndex, 0, modifiedItem);
		}
	};

	const { packAffiliate, packAffiliateDescription } = currentPack;

	const sortedIds = sortedCategoryIds(packCategories);
	return (
		<DndContext
			onDragStart={handleOnDragStart}
			onDragOver={handleOnDragOver}
			onDragEnd={handleOnDragEnd}
			sensors={sensors()}>
			<UserViewContext.Provider value={userView}>
				<div className="dashboard-container">
					<PackInfo
						currentPack={currentPack}
						packCategories={packCategories}
						fetching={isPending}
					/>

					<SortableContext
						disabled={!userView}
						items={sortedIds}
						strategy={verticalListSortingStrategy}>
						{packCategories.length >= 0 &&
							packCategories.map((category: Category, idx: number) => (
								<PackCategory
									category={category}
									packList={packList}
									index={idx}
									key={category?.packCategoryId || idx}
								/>
							))}

						<DragOverlay activeItem={activeItem} />
					</SortableContext>

					{userView && <AddCategoryButton onClick={handleAddPackCategory} />}
					{!userView && (
						<DashboardFooter
							affiliate={packAffiliate}
							description={packAffiliateDescription}
						/>
					)}
				</div>
			</UserViewContext.Provider>
		</DndContext>
	);
};

export default Dashboard;

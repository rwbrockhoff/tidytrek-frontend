import { type PackListItem, type Category, type PackItem } from '@/types/pack-types';
import { useState, useCallback, useMemo } from 'react';
import styles from './pack-category.module.css';
import { cn } from '@/styles/utils';
import { Draggable } from 'react-beautiful-dnd';
import { Table, TableRow, TableHeader, TableFooter } from '@/components/table';
import { useUserContext } from '@/hooks/use-viewer-context';
import { DropTableBody } from '@/components';
import { usePackItemActions } from '../hooks/use-pack-item-actions';
import { convertCurrency, convertWeight, convertQuantity } from '@/utils';

type PackCategoryProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

export const PackCategory = ({ category, packList, index }: PackCategoryProps) => {
	const userView = useUserContext();

	const { addPackItem, moveItemToCloset, editPackItem, deletePackItem } =
		usePackItemActions();

	const { packCategoryName, packCategoryColor, packCategoryId, packId, packItems } =
		category;

	const categoryHeaderInfo = { packCategoryId, packCategoryName, packCategoryColor };

	const [isMinimized, setMinimized] = useState(false);

	// useCallback prevents unnecessary TableRow re-renders
	const handleAddItem = useCallback(
		() => addPackItem({ packId, packCategoryId }),
		[addPackItem, packId, packCategoryId],
	);

	const handleMinimizeCategory = useCallback(
		() => setMinimized(!isMinimized),
		[isMinimized],
	);

	const { totalWeight: convertedCategoryWeight, totalPrice } = useMemo(
		() => convertWeight(packItems, 'lb'),
		[packItems],
	);

	const formattedTotalPrice = useMemo(
		() => convertCurrency(totalPrice, 'USD'),
		[totalPrice],
	);
	const itemQuantity = useMemo(
		() => (packItems[0] ? convertQuantity(packItems) : 0),
		[packItems],
	); // todo: get from weight converter
	// minize or hide pack items when empty
	const showCategoryItems = packItems[0] && !isMinimized;
	// hide empty categories on guest view
	if (!userView && !showCategoryItems) return null;

	return (
		<Draggable
			key={category.packCategoryId}
			draggableId={`${category.packCategoryId}`}
			isDragDisabled={!userView}
			index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					className={cn(styles.tableContainer, isMinimized && styles.minimized)}
					data-testid="pack-category-row">
					<Table>
						<TableHeader
							dragProps={{ ...provided.dragHandleProps }}
							categoryHeaderInfo={categoryHeaderInfo}
							isMinimized={isMinimized}
							minimizeCategory={handleMinimizeCategory}
						/>

						<DropTableBody droppableId={packCategoryId} type="item">
							{showCategoryItems &&
								packItems.map((item: PackItem, index) => (
									<TableRow
										item={item}
										key={item.packItemId}
										index={index}
										packList={packList}
										disabled={!userView}
										moveToCloset={moveItemToCloset}
										handleOnSave={editPackItem}
										handleDelete={deletePackItem}
									/>
								))}
						</DropTableBody>

						{!isMinimized && (
							<TableFooter
								handleAddItem={handleAddItem}
								showTotals={true}
								itemQuantity={itemQuantity}
								weight={convertedCategoryWeight}
								price={formattedTotalPrice}
							/>
						)}
					</Table>
				</div>
			)}
		</Draggable>
	);
};

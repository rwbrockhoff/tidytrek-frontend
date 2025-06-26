import { type PackListItem, type Category, type PackItem } from '@/types/pack-types';
import { useState } from 'react';
import styles from './pack-category.module.css';
import { cn } from '@/styles/utils';
import { Draggable } from 'react-beautiful-dnd';
import { Table, TableRow, TableHeader, TableFooter } from '@/components/table';
import { useUserContext } from '@/hooks/use-viewer-context';
import { DropTableBody } from '@/components';
import { usePackItemHandlers } from '../handlers/use-pack-item-handlers';
import { convertCurrency, convertWeight, convertQuantity } from '@/utils';

type PackCategoryProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

export const PackCategory = ({ category, packList, index }: PackCategoryProps) => {
	const userView = useUserContext();

	const { handlers } = usePackItemHandlers();

	const { addPackItem, moveItemToCloset, editPackItem, deleteItem } = handlers;

	const handleAddItem = () => addPackItem({ packId, packCategoryId });

	const { packCategoryName, packCategoryColor, packCategoryId, packId, packItems } =
		category;

	const categoryHeaderInfo = { packCategoryId, packCategoryName, packCategoryColor };

	const [isMinimized, setMinimized] = useState(false);
	const handleMinimizeCategory = () => setMinimized(!isMinimized);

	const { totalWeight: convertedCategoryWeight, totalPrice } = convertWeight(
		packItems,
		'lb',
	);

	const formattedTotalPrice = convertCurrency(totalPrice, 'USD');
	const itemQuantity = packItems[0] ? convertQuantity(packItems) : 0; // todo: get from weight converter
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
										handleDelete={deleteItem}
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

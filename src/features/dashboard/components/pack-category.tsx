import { type PackListItem, type Category, type PackItem } from '@/types/pack-types';
import styles from './pack-category.module.css';
import { cn } from '@/styles/utils';
import { Draggable } from 'react-beautiful-dnd';
import { Table, TableRow, TableHeader, TableFooter } from '@/components/table';
import { useUserContext } from '@/hooks/use-viewer-context';
import { DropTableBody } from '@/components';
import { usePackCategory } from '../hooks/use-pack-category';

type PackCategoryProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

export const PackCategory = ({ category, packList, index }: PackCategoryProps) => {
	const userView = useUserContext();

	const {
		packCategoryName,
		packCategoryColor,
		packCategoryId,
		packItems,
		isMinimized,
		handleAddItem,
		handleMinimizeCategory,
		moveItemToCloset,
		editPackItem,
		deletePackItem,
		convertedCategoryWeight,
		formattedTotalPrice,
		itemQuantity,
	} = usePackCategory(category);

	const categoryHeaderInfo = { packCategoryId, packCategoryName, packCategoryColor };

	const showCategoryItems = !isMinimized;

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

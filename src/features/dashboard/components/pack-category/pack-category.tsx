import { type PackListItem, type Category, type PackItem } from '@/types/pack-types';
import styles from './pack-category.module.css';
import { cn, mx } from '@/styles/utils';
import { Flex } from '@/components/layout';
import { Draggable } from 'react-beautiful-dnd';
import { Table } from '@/shared/components/pack-item-management/table';
import { TableRow } from '@/shared/components/pack-item-management/table/table-row/table-row';
import { TableHeader } from '@/shared/components/pack-item-management/table/table-header/table-header';
import { TableFooter } from '@/shared/components/pack-item-management/table/table-footer/table-footer';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { DropTableBody } from '@/components';
import { usePackCategory } from '../../hooks/use-pack-category';
import {
	useAddNewPackItemMutation,
	useMoveItemToClosetMutation,
	useEditPackItemMutation,
	useDeletePackItemMutation,
} from '@/queries/pack-queries';
import { normalizeURL } from '@/utils/link-utils';
import { type BaseTableRowItem, isPackItem } from '@/types/pack-types';

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
		packId,
		packItems,
		isMinimized,
		handleMinimizeCategory,
		convertedCategoryWeight,
		formattedTotalPrice,
		itemQuantity,
	} = usePackCategory(category);

	const { mutate: addPackItem } = useAddNewPackItemMutation();
	const { mutate: moveItemToCloset } = useMoveItemToClosetMutation();
	const { mutate: editPackItem } = useEditPackItemMutation();
	const { mutate: deletePackItem } = useDeletePackItemMutation();

	const handleAddItem = () => {
		addPackItem({ packId, packCategoryId });
	};

	const handleEditPackItem = (packItem: BaseTableRowItem) => {
		const { packItemId, packItemUrl } = packItem;
		const cleanUrl = normalizeURL(packItemUrl);

		if (isPackItem(packItem)) {
			editPackItem({
				packItemId,
				packItem: { ...packItem, packItemUrl: cleanUrl },
			});
		}
	};

	const handleMoveItemToCloset = (packItemId: number) => {
		moveItemToCloset(packItemId);
	};

	const handleDeleteItem = (packItemId: number) => {
		deletePackItem(packItemId);
	};

	const categoryHeaderInfo = { packCategoryId, packCategoryName, packCategoryColor };

	const showCategoryItems = !isMinimized;

	return (
		<Draggable
			key={category.packCategoryId}
			draggableId={`${category.packCategoryId}`}
			isDragDisabled={!userView}
			index={index}>
			{(provided) => (
				<Flex
					ref={provided.innerRef}
					{...provided.draggableProps}
					className={cn(styles.tableContainer, isMinimized && styles.minimized, "w-full mb-12", mx.textCenter)}
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
										moveToCloset={handleMoveItemToCloset}
										handleOnSave={handleEditPackItem}
										handleDelete={handleDeleteItem}
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
				</Flex>
			)}
		</Draggable>
	);
};

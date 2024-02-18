import { Table } from '../../../shared/ui/SemanticUI';
import {
	type PackListItem,
	type Category,
	type PackItem,
	type PackInfo,
} from '../../../types/packTypes';
import './PackCategory.css';
import TableRow from './TableRow/TableRow';
import TableHeader from './TableHeader/TableHeader';
import { DeleteModal, DeleteItemModal } from '../../../shared/ui/Modals';
import { useState } from 'react';
import {
	useAddNewPackItemMutation,
	useEditPackItemMutation,
	useEditPackCategoryMutation,
	useMoveItemToClosetMutation,
	useDeletePackItemMutation,
	useDeletePackCategoryMutation,
	useDeletePackCategoryAndItemsMutation,
} from '../../../queries/packQueries';
import { useMoveItemToPackMutation } from '../../../queries/closetQueries';
import { weightConverter, quantityConverter } from '../../../utils/weightConverter';
import { useUserContext } from '../../../views/Dashboard/useUserContext';
import TableFooter from './TableFooter/TableFooter';
import { DropTableBody } from '../../../shared/DragDropWrapper';
import { Draggable } from 'react-beautiful-dnd';

type PackCategoryProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

export type CategoryChanges = {
	packCategoryName?: string;
	packCategoryColor?: string;
};

const PackCategory = ({ category, packList, index }: PackCategoryProps) => {
	const userView = useUserContext();

	const { packCategoryName, packCategoryColor, packCategoryId, packId, packItems } =
		category;

	const { mutate: addPackItem } = useAddNewPackItemMutation();
	const { mutate: editPackItem } = useEditPackItemMutation();
	const { mutate: movePackItem } = useMoveItemToClosetMutation();
	const { mutate: moveToPack } = useMoveItemToPackMutation();

	const { mutate: deletePackItem } = useDeletePackItemMutation();

	const { mutate: editPackCategory } = useEditPackCategoryMutation();
	const { mutate: deleteCategory } = useDeletePackCategoryMutation();
	const { mutate: deleteCategoryAndItems } = useDeletePackCategoryAndItemsMutation();

	const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
	const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
	const [packItemToChange, setPackItemToChange] = useState<number | null>(null);
	const [isMinimized, setMinimized] = useState(false);

	const handleToggleCategoryModal = () =>
		setShowDeleteCategoryModal(!showDeleteCategoryModal);

	const handleMinimizeCategory = () => setMinimized(!isMinimized);

	const handleEditCategory = (categoryChanges: CategoryChanges) => {
		editPackCategory({ packCategoryId, categoryChanges });
	};

	const handleDeleteCategoryAndItems = () => {
		deleteCategoryAndItems(packCategoryId);
		setShowDeleteCategoryModal(false);
	};

	const handleDeleteCategory = () => {
		deleteCategory(packCategoryId);
		setShowDeleteCategoryModal(false);
	};

	const handleAddItem = () => addPackItem({ packId, packCategoryId });

	const handleToggleItemModal = () => setShowDeleteItemModal(!showDeleteItemModal);

	const handleMoveItem = () => {
		if (packItemToChange) movePackItem(packItemToChange);
		setShowDeleteItemModal(false);
	};

	const handleMoveItemToPack = (packInfo: PackInfo) => moveToPack(packInfo);

	const handleDeleteItem = () => {
		if (packItemToChange) deletePackItem(packItemToChange);
		setShowDeleteItemModal(false);
	};

	const handleOnSave = (packItem: PackItem) => {
		const { packItemId } = packItem;
		editPackItem({ packItemId, packItem });
	};

	const handleDeleteItemPrompt = (packItemId: number) => {
		setPackItemToChange(packItemId);
		setShowDeleteItemModal(true);
	};

	const { totalWeight: convertedCategoryWeight } = weightConverter(packItems, 'lb');
	const itemQuantity = packItems[0] ? quantityConverter(packItems) : 0;
	const showCategoryItems = packItems[0] && !isMinimized;

	return (
		<Draggable
			key={category.packCategoryId}
			draggableId={`${category.packCategoryId}`}
			isDragDisabled={!userView}
			index={index}>
			{(provided) => (
				<div
					className="table-container"
					ref={provided.innerRef}
					{...provided.draggableProps}>
					<Table
						$themeColor={packCategoryColor}
						$minimalPadding
						fixed
						striped
						compact
						columns="16"
						size="small">
						<TableHeader
							dragProps={{ ...provided.dragHandleProps }}
							categoryName={packCategoryName}
							categoryColor={packCategoryColor}
							isMinimized={isMinimized}
							minimizeCategory={handleMinimizeCategory}
							editCategory={handleEditCategory}
							deleteCategory={handleToggleCategoryModal}
						/>

						<DropTableBody droppableId={packCategoryId} type="item">
							{showCategoryItems &&
								packItems.map((item: PackItem, idx) => (
									<TableRow
										item={item}
										key={item.packItemId}
										index={idx}
										packList={packList}
										handleMoveItemToPack={handleMoveItemToPack}
										handleOnSave={handleOnSave}
										handleDelete={handleDeleteItemPrompt}
									/>
								))}
						</DropTableBody>

						{!isMinimized && (
							<TableFooter
								itemQuantity={itemQuantity}
								weight={convertedCategoryWeight}
								handleAddItem={handleAddItem}
							/>
						)}
					</Table>

					<DeleteModal
						open={showDeleteCategoryModal}
						onClickMove={handleDeleteCategory}
						onClickDelete={handleDeleteCategoryAndItems}
						onClose={handleToggleCategoryModal}
					/>

					<DeleteItemModal
						id={packItemToChange}
						open={showDeleteItemModal}
						onClose={handleToggleItemModal}
						onClickMove={handleMoveItem}
						onClickDelete={handleDeleteItem}
					/>
				</div>
			)}
		</Draggable>
	);
};

export default PackCategory;

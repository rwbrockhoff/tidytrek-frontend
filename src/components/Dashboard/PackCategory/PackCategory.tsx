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
import { weightConverter, quantityConverter } from '../../../utils/weightConverter';
import { useUserContext } from '../../../views/Dashboard/useUserContext';
import TableFooter from './TableFooter/TableFooter';
import { DropTableBody } from '../../../shared/DragDropWrapper';
import { Draggable } from 'react-beautiful-dnd';
import { usePackMutations } from '../../../views/Dashboard/usePackMutations';
import { useHandlers } from '../../../views/Dashboard/useHandlers';

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

	const { editPackItem } = useHandlers().handlers;

	const { packCategoryName, packCategoryColor, packCategoryId, packId, packItems } =
		category;

	const {
		addPackItem,
		movePackItemToCloset,
		moveItemToPack,
		deletePackItem,
		editPackCategory,
		deletePackCategory,
		deletePackCategoryAndItems,
	} = usePackMutations();

	const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
	const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

	const [packItemToChange, setPackItemToChange] = useState<number | null>(null);

	const handleToggleCategoryModal = () =>
		setShowDeleteCategoryModal(!showDeleteCategoryModal);

	const handleEditCategory = (categoryChanges: CategoryChanges) => {
		editPackCategory.mutate({ packCategoryId, categoryChanges });
	};

	const handleDeleteCategoryAndItems = () => {
		deletePackCategoryAndItems.mutate(packCategoryId);
		setShowDeleteCategoryModal(false);
	};

	const handleDeleteCategory = () => {
		deletePackCategory.mutate(packCategoryId);
		setShowDeleteCategoryModal(false);
	};

	const handleAddItem = () => addPackItem.mutate({ packId, packCategoryId });

	const handleToggleItemModal = () => setShowDeleteItemModal(!showDeleteItemModal);

	const handleMoveItem = () => {
		if (packItemToChange) movePackItemToCloset.mutate(packItemToChange);
		setShowDeleteItemModal(false);
	};

	const handleMoveItemToPack = (packInfo: PackInfo) => moveItemToPack.mutate(packInfo);

	const handleDeleteItem = () => {
		if (packItemToChange) deletePackItem.mutate(packItemToChange);
		setShowDeleteItemModal(false);
	};

	const handleDeleteItemPrompt = (packItemId: number) => {
		setPackItemToChange(packItemId);
		setShowDeleteItemModal(true);
	};

	const [isMinimized, setMinimized] = useState(false);
	const handleMinimizeCategory = () => setMinimized(!isMinimized);

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
										handleOnSave={editPackItem}
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

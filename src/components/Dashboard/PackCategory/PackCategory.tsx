import { Table } from '../../../shared/ui/SemanticUI';
import {
	type PackListItem,
	type Category,
	type PackItem,
} from '../../../types/packTypes';
import styled from 'styled-components';
import './PackCategory.css';
import TableRow from './TableRow/TableRow';
import TableHeader from './TableHeader/TableHeader';
import { DeleteModal, DeleteItemModal } from '../../../shared/ui/Modals';
import { useState } from 'react';
import { weightConverter, quantityConverter } from '../../../utils/weightConverter';
import { useUserContext } from '../../../views/Dashboard/hooks/useUserContext';
import TableFooter from './TableFooter/TableFooter';
import { DropTableBody } from '../../../shared/DragDropWrapper';
import { Draggable } from 'react-beautiful-dnd';
import { usePackItemHandlers } from '../../../views/Dashboard/handlers/usePackItemHandlers';
import { usePackCategoryHandlers } from '../../../views/Dashboard/handlers/usePackCategoryHandlers';

type PackCategoryProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

const PackCategory = ({ category, packList, index }: PackCategoryProps) => {
	const userView = useUserContext();

	const { handlers, handlerState } = usePackItemHandlers();
	const { handlers: categoryHandlers, handlerState: categoryHandlerState } =
		usePackCategoryHandlers();

	const {
		addPackItem,
		moveItemToCloset,
		moveItemToPack,
		editPackItem,
		deleteItemPrompt,
		toggleItemModal,
		deleteItem,
	} = handlers;

	const { toggleCategoryModal, deleteCategory, deleteCategoryAndItems } =
		categoryHandlers;

	const { packItemToChange, showDeleteItemModal } = handlerState;
	const { showDeleteCategoryModal } = categoryHandlerState;

	const handleAddItem = () => addPackItem({ packId, packCategoryId });

	const { packCategoryName, packCategoryColor, packCategoryId, packId, packItems } =
		category;

	const categoryHeaderInfo = { packCategoryId, packCategoryName, packCategoryColor };

	const [isMinimized, setMinimized] = useState(false);
	const handleMinimizeCategory = () => setMinimized(!isMinimized);

	const { totalWeight: convertedCategoryWeight, totalPrice } = weightConverter(
		packItems,
		'lb',
	);

	const itemQuantity = packItems[0] ? quantityConverter(packItems) : 0; // todo: get from weight converter
	const showCategoryItems = packItems[0] && !isMinimized;

	return (
		<Draggable
			key={category.packCategoryId}
			draggableId={`${category.packCategoryId}`}
			isDragDisabled={!userView}
			index={index}>
			{(provided) => (
				<TableContainer ref={provided.innerRef} {...provided.draggableProps}>
					<StyledTable
						$themeColor={packCategoryColor}
						$minimalPadding
						fixed
						striped
						compact
						stackable
						size="small">
						<TableHeader
							dragProps={{ ...provided.dragHandleProps }}
							categoryHeaderInfo={categoryHeaderInfo}
							isMinimized={isMinimized}
							minimizeCategory={handleMinimizeCategory}
							deleteCategory={toggleCategoryModal}
						/>

						<DropTableBody droppableId={packCategoryId} type="item">
							{showCategoryItems &&
								packItems.map((item: PackItem, idx) => (
									<TableRow
										item={item}
										key={item.packItemId}
										index={idx}
										packList={packList}
										handleMoveItemToPack={moveItemToPack}
										handleOnSave={editPackItem}
										handleDelete={deleteItemPrompt}
									/>
								))}
						</DropTableBody>

						{!isMinimized && (
							<TableFooter
								itemQuantity={itemQuantity}
								weight={convertedCategoryWeight}
								price={totalPrice}
								handleAddItem={handleAddItem}
							/>
						)}
					</StyledTable>
					<DeleteModal
						open={showDeleteCategoryModal}
						onClickMove={() => deleteCategory(packCategoryId)}
						onClickDelete={() => deleteCategoryAndItems(packCategoryId)}
						onClose={toggleCategoryModal}
					/>
					<DeleteItemModal
						id={packItemToChange}
						open={showDeleteItemModal}
						onClose={toggleItemModal}
						onClickMove={moveItemToCloset}
						onClickDelete={deleteItem}
					/>
				</TableContainer>
			)}
		</Draggable>
	);
};

export default PackCategory;

const TableContainer = styled.div`
	width: 100%;
	text-align: center;
	margin: 5vh 0px;
	display: flex;
`;

const StyledTable = styled(Table)`
	td {
		width: 5%;
	}
`;

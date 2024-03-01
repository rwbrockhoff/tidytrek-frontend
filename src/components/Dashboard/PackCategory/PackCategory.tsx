import TidyTable from '../../../shared/ui/TidyTable';
import {
	type PackListItem,
	type Category,
	type PackItem,
} from '../../../types/packTypes';
import styled from 'styled-components';
import TableRow from './TableRow/TableRow';
import TableHeader from './TableHeader/TableHeader';
import { DeleteItemModal } from '../../../shared/ui/Modals';
import { useState } from 'react';
import { weightConverter, quantityConverter } from '../../../utils/weightConverter';
import { useUserContext } from '../../../views/Dashboard/hooks/useViewerContext';
import TableFooter from './TableFooter/TableFooter';
import { DropTableBody } from '../../../shared/components/DragDropWrapper';
import { Draggable } from 'react-beautiful-dnd';
import { usePackItemHandlers } from '../../../views/Dashboard/handlers/usePackItemHandlers';
import useCurrency from '../../../utils/useCurrency';
import { mobile } from '../../../shared/mixins/mixins';

type PackCategoryProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

const PackCategory = ({ category, packList, index }: PackCategoryProps) => {
	const userView = useUserContext();

	const { handlers, handlerState } = usePackItemHandlers();

	const {
		addPackItem,
		moveItemToCloset,
		moveItemToPack,
		editPackItem,
		deleteItemPrompt,
		toggleItemModal,
		deleteItem,
	} = handlers;

	const { packItemToChange, showDeleteItemModal } = handlerState;

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

	const formattedTotalPrice = useCurrency(totalPrice, 'USD');
	const itemQuantity = packItems[0] ? quantityConverter(packItems) : 0; // todo: get from weight converter
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
				<TableContainer
					ref={provided.innerRef}
					{...provided.draggableProps}
					$isMinimized={isMinimized}>
					<TidyTable
						$tableCellWidth="5%"
						$themeColor={packCategoryColor}
						$minimalPadding
						fixed
						striped
						compact
						unstackable
						size="small">
						<TableHeader
							dragProps={{ ...provided.dragHandleProps }}
							categoryHeaderInfo={categoryHeaderInfo}
							isMinimized={isMinimized}
							minimizeCategory={handleMinimizeCategory}
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
								price={formattedTotalPrice}
								handleAddItem={handleAddItem}
							/>
						)}
					</TidyTable>

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

const TableContainer = styled.div<{ $isMinimized: boolean }>`
	width: 100%;
	text-align: center;
	margin: 5vh 0px;
	display: flex;

	${({ $isMinimized }) =>
		mobile(`
		height: fit-content;
		margin-bottom: ${$isMinimized ? '0px' : '75px'};
	`)}
`;

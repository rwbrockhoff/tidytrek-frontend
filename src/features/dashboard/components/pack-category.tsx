import { type PackListItem, type Category, type PackItem } from '@/types/pack-types';
import { useState } from 'react';
import styled from 'styled-components';
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
										moveToCloset={moveItemToCloset}
										handleOnSave={editPackItem}
										handleDelete={deleteItem}
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
					</Table>
				</TableContainer>
			)}
		</Draggable>
	);
};

const TableContainer = styled.div<{ $isMinimized: boolean }>`
	width: 100%;
	text-align: center;
	margin-bottom: 3em;
	display: flex;

	${({ $isMinimized }) =>
		({ theme: t }) =>
			t.mx.mobile(`
		height: fit-content;
		margin-bottom: ${$isMinimized ? '0px' : '75px'};
	`)}
`;

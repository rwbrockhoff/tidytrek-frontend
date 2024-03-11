import { Icon } from 'semantic-ui-react';
import TidyTable from '../../../shared/ui/TidyTable';
import { Button, Table } from '../../../shared/ui/SemanticUI';
import { type PackListItem, type PackItem, PackInfo } from '../../../types/packTypes';
import {
	useAddGearClosetItemMutation,
	useDeleteGearClosetItemMutation,
	useEditGearClosetItemMutation,
	useMoveGearClosetItemMutation,
	useMoveItemToPackMutation,
} from '../../../queries/closetQueries';
import TableRow from '../../Dashboard/PackCategory/TableRow/TableRow';
import GearClosetHeader from './GearClosetHeader';
import {
	DragDropContext,
	DropResult,
	DropTableBody,
} from '../../../shared/components/DragDropWrapper';
import { StyledFooter } from '../../Dashboard/PackCategory/TableFooter/TableFooter';
import { PricingContext } from '../../../views/Dashboard/hooks/useViewerContext';
import styled from 'styled-components';
import NotFoundMessage from './NotFoundMessage';

export type GearClosetListProps = {
	packList: PackListItem[] | [];
	gearClosetList: PackItem[] | [];
	dragDisabled: boolean;
	listHasItems: boolean;
};

const GearClosetList = (props: GearClosetListProps) => {
	const { gearClosetList, packList, dragDisabled, listHasItems } = props;

	const { mutate: addItem, isPending: isPendingAddItem } = useAddGearClosetItemMutation();
	const { mutate: editItem } = useEditGearClosetItemMutation();
	const { mutate: moveToPack } = useMoveItemToPackMutation();
	const { mutate: moveGearClosetItem } = useMoveGearClosetItemMutation();
	const { mutate: deleteItem } = useDeleteGearClosetItemMutation();

	const handleMoveItemToPack = (packInfo: PackInfo) => moveToPack(packInfo);
	const handleOnSave = (packItem: PackItem) => editItem(packItem);
	const handleDelete = (packItemId: number) => deleteItem(packItemId);

	const handleOnDragEnd = (result: DropResult) => {
		const { draggableId, destination, source } = result;
		if (!destination) return;

		const sameIndex = destination.index === source.index;
		const sameCategory = destination.droppableId === source.droppableId;

		if (sameIndex && sameCategory) return;
		const dragId = draggableId.replace(/\D/g, '');

		moveGearClosetItem({
			packItemId: dragId,
			packItemIndex: destination.index,
			prevPackItemIndex: source.index,
		});
	};

	return (
		<PricingContext.Provider value={true}>
			<StyledTidyTable
				$tableCellWidth="5%"
				$themeColor="primary"
				unstackable
				fixed
				striped
				size="small">
				<GearClosetHeader />

				{listHasItems ? (
					<DragDropContext onDragEnd={handleOnDragEnd}>
						<DropTableBody
							droppableId={`gear-closet`}
							type="closet-item"
							disabled={dragDisabled}>
							{gearClosetList.map((item: PackItem, index) => (
								<TableRow
									item={item}
									packList={packList}
									disabled={dragDisabled}
									key={item.packItemId}
									index={index}
									handleMoveItemToPack={handleMoveItemToPack}
									handleOnSave={handleOnSave}
									handleDelete={handleDelete}
								/>
							))}
						</DropTableBody>
					</DragDropContext>
				) : (
					<NotFoundMessage />
				)}

				<StyledFooter>
					<Table.Row>
						<Table.Cell colSpan="24">
							<Button
								size="mini"
								floated="left"
								compact
								basic
								$footerButton
								disabled={isPendingAddItem}
								onClick={() => addItem()}>
								<Icon name="add" />
								Add Item
							</Button>
						</Table.Cell>
					</Table.Row>
				</StyledFooter>
			</StyledTidyTable>
		</PricingContext.Provider>
	);
};

export default GearClosetList;

const StyledTidyTable = styled(TidyTable)`
	&&& {
		${({ theme: t }) =>
			t.mx.mobile(`
				thead {
					display: none;
				}

				tfoot button {
					font-size: 1.1em;
				}
		`)}
	}
`;

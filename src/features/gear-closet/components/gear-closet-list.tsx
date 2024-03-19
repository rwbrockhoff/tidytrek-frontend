import { type PackListItem, type PackItem } from '@/types/pack-types';
import { PlusIcon } from '@/components/ui';
import { Button, Table } from '@radix-ui/themes';
import styled from 'styled-components';
import { TidyTable } from '@/components/ui';
import { DragDropContext, DropResult, DropTableBody } from '@/components';
import {
	useAddGearClosetItemMutation,
	useDeleteGearClosetItemMutation,
	useEditGearClosetItemMutation,
	useMoveGearClosetItemMutation,
} from '@/queries/closet-queries';
import { TableRow, StyledFooter } from '@/components/table';
import { GearClosetHeader } from './gear-closet-header';
import { PricingContext } from '@/hooks/use-viewer-context';
import { NotFoundMessage } from './not-found-message';

export type GearClosetListProps = {
	packList: PackListItem[] | [];
	gearClosetList: PackItem[] | [];
	dragDisabled: boolean;
	listHasItems: boolean;
};

export const GearClosetList = (props: GearClosetListProps) => {
	const { gearClosetList, packList, dragDisabled, listHasItems } = props;

	const { mutate: addItem, isPending: isPendingAddItem } = useAddGearClosetItemMutation();
	const { mutate: editItem } = useEditGearClosetItemMutation();
	const { mutate: moveGearClosetItem } = useMoveGearClosetItemMutation();
	const { mutate: deleteItem } = useDeleteGearClosetItemMutation();

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
						<Table.Cell colSpan={24}>
							<Button
								variant="outline"
								color="gray"
								size="1"
								disabled={isPendingAddItem}
								onClick={() => addItem()}>
								<PlusIcon />
								Add Item
							</Button>
						</Table.Cell>
					</Table.Row>
				</StyledFooter>
			</StyledTidyTable>
		</PricingContext.Provider>
	);
};

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

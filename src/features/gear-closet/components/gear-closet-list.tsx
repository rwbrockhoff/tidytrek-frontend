import { type PackListItem, type PackItem } from '@/types/pack-types';
import { PlusIcon } from '@/components/ui';
import { Button, Table as RadixTable } from '@radix-ui/themes';
import { Table } from '@/components/table';
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
		if (sameIndex) return;

		const dragId = draggableId.replace(/\D/g, '');
		moveGearClosetItem({
			packItemId: dragId,
			packItemIndex: destination.index,
			prevPackItemIndex: source.index,
		});
	};

	return (
		<PricingContext.Provider value={true}>
			<Table>
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
					<RadixTable.Row>
						<RadixTable.Cell colSpan={8}>
							<Button
								variant="outline"
								color="gray"
								size="1"
								disabled={isPendingAddItem}
								onClick={() => addItem()}>
								<PlusIcon />
								Add Item
							</Button>
						</RadixTable.Cell>
					</RadixTable.Row>
				</StyledFooter>
			</Table>
		</PricingContext.Provider>
	);
};

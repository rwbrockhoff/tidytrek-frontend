import { type PackListItem, type GearClosetItem } from '@/types/pack-types';
import {
	Table,
	TableRow,
	TableFooter,
} from '@/shared/components/pack-item-management/table';
import { DragDropContext, DropResult, DropTableBody } from '@/components';
import { GearClosetHeader } from '../gear-closet-header/gear-closet-header';
import { PricingContext } from '@/contexts/pricing-context';
import { NotFoundMessage } from '../not-found-message';
import {
	useAddGearClosetItemMutation,
	useEditGearClosetItemMutation,
	useDeleteGearClosetItemMutation,
} from '@/queries/closet-queries';
import { useGearClosetDragHandler } from '../../hooks/use-gear-closet-drag-handler';
import { type BaseTableRowItem, isGearClosetItem } from '@/types/pack-types';

export type GearClosetListProps = {
	packList: PackListItem[] | [];
	gearClosetList: GearClosetItem[];
	dragDisabled: boolean;
	listHasItems: boolean;
};

export const GearClosetList = (props: GearClosetListProps) => {
	const { gearClosetList, packList, dragDisabled, listHasItems } = props;

	const { mutate: addGearClosetItem } = useAddGearClosetItemMutation();
	const { mutate: editGearClosetItem } = useEditGearClosetItemMutation();
	const { mutate: deleteGearClosetItem } = useDeleteGearClosetItemMutation();
	const { onDragEnd } = useGearClosetDragHandler();

	const handleOnSave = (formData: BaseTableRowItem) => {
		if (isGearClosetItem(formData)) {
			const gearClosetItem: GearClosetItem = {
				...formData,
				packId: null,
				packCategoryId: null,
			};
			editGearClosetItem(gearClosetItem);
		}
	};

	const handleDelete = (packItemId: number) => {
		deleteGearClosetItem(packItemId);
	};

	const handleAddItem = () => {
		addGearClosetItem();
	};

	const handleOnDragEnd = (result: DropResult) => {
		onDragEnd(result, gearClosetList);
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
							{gearClosetList.map((item, index) => (
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

				<TableFooter handleAddItem={handleAddItem} showTotals={false} />
			</Table>
		</PricingContext.Provider>
	);
};

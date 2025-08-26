import {
	DndContext,
	closestCenter,
	PointerSensor,
	KeyboardSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { PackListItem, GearClosetItem } from '@/types/pack-types';
import { Table } from '@/shared/components/pack-item-management/table';
import { TableRowMemo } from '@/shared/components/pack-item-management/table/table-row/table-row-memo';
import { TableRowContext } from '@/types/pack-types';
import { Table as AlpineTable } from '@/components/alpine';
import { TableFooter } from '@/shared/components/pack-item-management/table/table-footer/table-footer';
import { GearClosetHeader } from '../gear-closet-header/gear-closet-header';
import { NotFoundMessage } from '../not-found-message';
import { PackPricingContext } from '@/contexts/pack-pricing-context';
import { useAddGearClosetItemMutation } from '@/queries/closet-queries';
import { useGearClosetDragHandler } from '../../hooks/use-gear-closet-drag-handler';

export type GearClosetListProps = {
	packList: PackListItem[] | [];
	gearClosetList: GearClosetItem[];
	dragDisabled: boolean;
	listHasItems: boolean;
};

export const GearClosetList = (props: GearClosetListProps) => {
	const { gearClosetList, packList, dragDisabled, listHasItems } = props;

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	);
	const { localItems, handleDragStart, handleDragEnd } =
		useGearClosetDragHandler(gearClosetList);

	const { mutate: addGearClosetItem } = useAddGearClosetItemMutation();

	const handleAddItem = () => {
		addGearClosetItem();
	};

	return (
		<PackPricingContext.Provider value={true}>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}>
				<Table>
					<GearClosetHeader />
					<AlpineTable.Body style={{ minHeight: 10 }}>
						<SortableContext
							items={
								listHasItems ? localItems.map((item) => item.packItemId.toString()) : []
							}
							strategy={verticalListSortingStrategy}>
							{listHasItems ? (
								localItems.map((item) => (
									<TableRowMemo
										key={item.packItemId}
										item={item}
										packList={packList}
										disabled={dragDisabled}
										context={TableRowContext.CLOSET}
									/>
								))
							) : (
								<NotFoundMessage />
							)}
						</SortableContext>
					</AlpineTable.Body>
					<TableFooter handleAddItem={handleAddItem} showTotals={false} />
				</Table>
			</DndContext>
		</PackPricingContext.Provider>
	);
};

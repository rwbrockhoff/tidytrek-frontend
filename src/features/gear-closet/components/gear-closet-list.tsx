import { useCallback } from 'react';
import {
	type PackListItem,
	type GearClosetItem,
	type BaseTableRowItem,
	isGearClosetItem,
} from '@/types/pack-types';
import { Table } from '@/components/table';
import { DragDropContext, DropResult, DropTableBody } from '@/components';
import { TableRow, TableFooter } from '@/components/table';
import { GearClosetHeader } from './gear-closet-header';
import { PricingContext } from '@/hooks/use-viewer-context';
import { NotFoundMessage } from './not-found-message';
import { useGearClosetActions } from '../hooks/use-gear-closet-actions';

export type GearClosetListProps = {
	packList: PackListItem[] | [];
	gearClosetList: GearClosetItem[];
	dragDisabled: boolean;
	listHasItems: boolean;
};

export const GearClosetList = (props: GearClosetListProps) => {
	const { gearClosetList, packList, dragDisabled, listHasItems } = props;

	const {
		addGearClosetItem,
		editGearClosetItem,
		deleteGearClosetItem,
		onDragEnd,
	} = useGearClosetActions();

	// useCallback prevents unnecessary TableRow re-renders in large lists
	const handleOnSave = useCallback((item: BaseTableRowItem) => {
		editGearClosetItem(item);
	}, [editGearClosetItem]);

	const handleDelete = useCallback((packItemId: number) => {
		deleteGearClosetItem(packItemId);
	}, [deleteGearClosetItem]);

	const handleAddItem = useCallback(() => {
		addGearClosetItem();
	}, [addGearClosetItem]);

	const handleOnDragEnd = useCallback((result: DropResult) => {
		onDragEnd(result, gearClosetList);
	}, [onDragEnd, gearClosetList]);

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

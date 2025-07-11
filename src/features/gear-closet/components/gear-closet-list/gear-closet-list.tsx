import {
	type PackListItem,
	type GearClosetItem,
	type BaseTableRowItem,
} from '@/types/pack-types';
import { Table } from '@/components/table';
import { DragDropContext, DropResult, DropTableBody } from '@/components';
import { TableRow, TableFooter } from '@/components/table';
import { GearClosetHeader } from '../gear-closet-header/gear-closet-header';
import { PricingContext } from '@/contexts/pricing-context';
import { NotFoundMessage } from '../not-found-message';
import { useGearClosetActions } from '../../hooks/use-gear-closet-actions';

export type GearClosetListProps = {
	packList: PackListItem[] | [];
	gearClosetList: GearClosetItem[];
	dragDisabled: boolean;
	listHasItems: boolean;
};

export const GearClosetList = (props: GearClosetListProps) => {
	const { gearClosetList, packList, dragDisabled, listHasItems } = props;

	const { addGearClosetItem, editGearClosetItem, deleteGearClosetItem, onDragEnd } =
		useGearClosetActions();

	// Hooks already use useCallback, no need for double memoization
	const handleOnSave = (item: BaseTableRowItem) => editGearClosetItem(item);
	const handleDelete = (packItemId: number) => deleteGearClosetItem(packItemId);
	const handleAddItem = () => addGearClosetItem();
	const handleOnDragEnd = (result: DropResult) => onDragEnd(result, gearClosetList);

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

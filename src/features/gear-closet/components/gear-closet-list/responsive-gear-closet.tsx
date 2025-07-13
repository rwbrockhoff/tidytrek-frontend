import { type GearClosetItem, type PackListItem } from '@/types/pack-types';
import { useCheckScreen } from '@/hooks/ui/use-check-screen';
import { GearClosetList } from './gear-closet-list';
import { GearClosetCard } from '../gear-closet-card/gear-closet-card';
import { useAddGearClosetItemMutation, useEditGearClosetItemMutation, useDeleteGearClosetItemMutation } from '@/queries/closet-queries';
import { type BaseTableRowItem, isGearClosetItem } from '@/types/pack-types';

type ResponsiveGearClosetProps = {
	gearClosetList: GearClosetItem[];
	packList: PackListItem[];
	listHasItems: boolean;
	dragDisabled: boolean;
};

export const ResponsiveGearCloset = ({
	gearClosetList,
	packList,
	listHasItems,
	dragDisabled,
}: ResponsiveGearClosetProps) => {
	const { isMobile } = useCheckScreen();
	const { mutate: addGearClosetItem } = useAddGearClosetItemMutation();
	const { mutate: editGearClosetItem } = useEditGearClosetItemMutation();
	const { mutate: deleteGearClosetItem } = useDeleteGearClosetItemMutation();

	const handleAddItem = () => {
		addGearClosetItem();
	};

	const handleEditItem = (item: BaseTableRowItem) => {
		if (isGearClosetItem(item)) editGearClosetItem(item);
	};

	const handleDeleteItem = (packItemId: number) => {
		deleteGearClosetItem(packItemId);
	};

	if (isMobile) {
		return (
			<GearClosetCard
				items={gearClosetList}
				userView={true}
				onEdit={handleEditItem}
				onDelete={handleDeleteItem}
				onAddItem={handleAddItem}
			/>
		);
	}

	return (
		<GearClosetList
			gearClosetList={gearClosetList}
			packList={packList}
			listHasItems={listHasItems}
			dragDisabled={dragDisabled}
		/>
	);
};

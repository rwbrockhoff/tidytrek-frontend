import { type GearClosetItem, type PackListItem } from '@/types/pack-types';
import { useCheckScreen } from '@/hooks/use-check-screen';
import { GearClosetList } from './gear-closet-list';
import { GearClosetCard } from '../gear-closet-card/gear-closet-card';
import { useGearClosetActions } from '../../hooks/use-gear-closet-actions';

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
	const { addGearClosetItem, editGearClosetItem, deleteGearClosetItem } =
		useGearClosetActions();

	if (isMobile) {
		return (
			<GearClosetCard
				items={gearClosetList}
				userView={true}
				onEdit={editGearClosetItem}
				onDelete={deleteGearClosetItem}
				onAddItem={addGearClosetItem}
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

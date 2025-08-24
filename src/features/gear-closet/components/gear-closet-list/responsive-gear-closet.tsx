import { type GearClosetItem, type PackListItem } from '@/types/pack-types';
import { useScreen } from '@/hooks/ui/use-screen';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { GearClosetList } from './gear-closet-list';
import { GearClosetCard } from '../gear-closet-card/gear-closet-card';
import { useAddGearClosetItemMutation } from '@/queries/closet-queries';

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
	const { isMobile } = useScreen();
	const { isAuthenticated } = usePermissions();
	const { mutate: addGearClosetItem } = useAddGearClosetItemMutation();

	const handleAddItem = () => {
		addGearClosetItem();
	};

	if (isMobile) {
		return (
			<GearClosetCard
				items={gearClosetList}
				canEdit={isAuthenticated}
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

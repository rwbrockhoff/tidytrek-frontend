import { type GearClosetItem, type PackListItem } from '@/types/pack-types';
import { useCheckScreen } from '@/hooks/ui/use-check-screen';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
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
	const { isMobile } = useCheckScreen();
	const { isAuthenticated } = useUserPermissionsContext();
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

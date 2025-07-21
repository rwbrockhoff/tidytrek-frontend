import { useNavigate } from 'react-router-dom';
import { type GearClosetItem } from '@/types/pack-types';
import { useEditGearClosetItemMutation } from '@/queries/closet-queries';
import { encodePackItemId } from '@/utils';

export const useGearClosetOperations = () => {
	const navigate = useNavigate();
	const editMutation = useEditGearClosetItemMutation();

	const saveItem = (formData: GearClosetItem) => {
		return editMutation.mutate(formData, {
			onSuccess: () => navigate('/gear-closet'),
		});
	};

	const navigateToEdit = (item: GearClosetItem) => {
		const encodedPackItemId = encodePackItemId(item.packItemId);
		navigate(`/closet-item/edit/${encodedPackItemId}`, {
			state: { gearCloset: true },
		});
	};

	return { saveItem, navigateToEdit };
};
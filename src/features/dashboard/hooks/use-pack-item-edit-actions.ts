import { useNavigate } from 'react-router-dom';
import { type BaseTableRowItem, type PackItem, type GearClosetItem } from '@/types/pack-types';
import {
	useEditPackItemMutation,
	useDeletePackItemMutation,
} from '@/queries/pack-queries';
import {
	useEditGearClosetItemMutation,
} from '@/queries/closet-queries';
import { encode } from '@/utils';

type UsePackItemEditActionsProps = {
	packItemId: number | null;
	packId: number | null;
	gearCloset: boolean;
};

export const usePackItemEditActions = ({
	packItemId,
	packId,
	gearCloset,
}: UsePackItemEditActionsProps) => {
	const navigate = useNavigate();
	
	const editItemMutation = useEditPackItemMutation();
	const editGearClosetItemMutation = useEditGearClosetItemMutation();
	const deleteItemMutation = useDeletePackItemMutation();

	const encodedPackId = packId ? encode(packId) : null;

	const handleSave = (formData: BaseTableRowItem) => {
		if (!formData || !packItemId) return;

		if (gearCloset) {
			const gearClosetItem: GearClosetItem = {
				...formData,
				packId: null,
				packCategoryId: null,
			};
			editGearClosetItemMutation.mutate(gearClosetItem, {
				onSuccess: () => navigate('/gear-closet'),
			});
		} else {
			const packItem: PackItem = {
				...formData,
				packId: formData.packId!,
				packCategoryId: formData.packCategoryId!,
			};
			editItemMutation.mutate(
				{ packItemId, packItem },
				{
					onSuccess: () => navigate(`/pack/${encodedPackId}`),
				},
			);
		}
	};

	const handleDelete = () => {
		if (!packItemId) return;

		deleteItemMutation.mutate(packItemId, {
			onSuccess: () => {
				if (gearCloset) {
					navigate('/gear-closet');
				} else {
					navigate(`/pack/${encodedPackId}`);
				}
			},
		});
	};

	const handleCancel = () => {
		if (gearCloset) {
			navigate('/gear-closet');
		} else {
			navigate(`/pack/${encodedPackId}`);
		}
	};

	const isLoading = editItemMutation.isPending || editGearClosetItemMutation.isPending;
	const isDeleting = deleteItemMutation.isPending;

	return {
		handleSave,
		handleDelete,
		handleCancel,
		isLoading,
		isDeleting,
	};
};
import { useNavigate } from 'react-router-dom';
import { type PackItem } from '@/types/pack-types';
import { useEditPackItemMutation } from '@/queries/pack-queries';
import { encode } from '@/utils';

export const usePackItemOperations = () => {
	const navigate = useNavigate();
	const editMutation = useEditPackItemMutation();

	const saveItem = (formData: PackItem, packItemId: number) => {
		return editMutation.mutate(
			{ packItemId, packItem: formData },
			{
				onSuccess: () => {
					const encodedPackId = encode(formData.packId);
					navigate(`/pack/${encodedPackId}`);
				},
			}
		);
	};

	const navigateToEdit = (item: PackItem) => {
		const encodedPackItemId = encode(item.packItemId);
		navigate(`/pack-item/edit/${encodedPackItemId}`, {
			state: {
				packId: item.packId,
				packCategoryId: item.packCategoryId,
			},
		});
	};

	return { saveItem, navigateToEdit };
};
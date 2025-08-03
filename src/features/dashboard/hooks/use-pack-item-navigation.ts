import { useNavigate } from 'react-router-dom';
import { encodePackItemId } from '@/utils';
import { type BaseTableRowItem } from '@/types/pack-types';

export const usePackItemNavigation = () => {
	const navigate = useNavigate();

	const navigateToEdit = (item: BaseTableRowItem) => {
		const encodedPackItemId = encodePackItemId(item.packItemId);
		const hasPack = item.packId !== null;

		if (hasPack) {
			navigate(`/pack-item/edit/${encodedPackItemId}`, {
				state: {
					packId: item.packId,
					packCategoryId: item.packCategoryId,
				},
			});
		} else {
			navigate(`/closet-item/edit/${encodedPackItemId}`, {
				state: {
					gearCloset: true,
				},
			});
		}
	};

	return {
		navigateToEdit,
	};
};
import {
	useEditPackCategoryMutation,
	useAddNewPackItemMutation,
	useMoveItemToClosetMutation,
	useEditPackItemMutation,
	useDeletePackItemMutation,
} from '@/queries/pack-queries';
import { normalizeURL } from '@/utils/link-utils';
import { type BaseTableRowItem, isPackItem } from '@/types/pack-types';

type UsePackCategoryActionsProps = {
	packCategoryId: number;
	packId: number;
};

export const usePackCategoryActions = ({
	packCategoryId,
	packId,
}: UsePackCategoryActionsProps) => {
	const { mutate: editPackCategory } = useEditPackCategoryMutation();
	const { mutate: addPackItem } = useAddNewPackItemMutation();
	const { mutate: moveItemToCloset } = useMoveItemToClosetMutation();
	const { mutate: editPackItem } = useEditPackItemMutation();
	const { mutate: deletePackItem } = useDeletePackItemMutation();

	const handleChangeColor = (packCategoryColor: string) =>
		editPackCategory({ packCategoryColor, packCategoryId });

	const handleAddItem = () => {
		addPackItem({ packId, packCategoryId });
	};

	const handleEditPackItem = (packItem: BaseTableRowItem) => {
		const { packItemId, packItemUrl } = packItem;
		const cleanUrl = normalizeURL(packItemUrl);

		if (isPackItem(packItem)) {
			editPackItem({
				packItemId,
				packItem: { ...packItem, packItemUrl: cleanUrl },
			});
		}
	};

	const handleMoveItemToCloset = (packItemId: number) => {
		moveItemToCloset(packItemId);
	};

	const handleDeleteItem = (packItemId: number) => {
		deletePackItem(packItemId);
	};

	return {
		handleChangeColor,
		handleAddItem,
		handleEditPackItem,
		handleMoveItemToCloset,
		handleDeleteItem,
	};
};
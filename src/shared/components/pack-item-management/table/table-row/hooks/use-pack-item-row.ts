import { type BaseTableRowItem } from '@/types/pack-types';
import { normalizeURL } from '@/utils/link-utils';
import { extractErrorMessage } from '@/utils/error-utils';

export type ItemMutations = {
	edit: {
		mutate: (data: { packItemId: number; packItem: BaseTableRowItem }) => void;
		error: unknown;
		isError: boolean;
	};
	delete: {
		mutate: (data: { packItemId: number; packId: number }) => void;
		error: unknown;
		isError: boolean;
	};
};

type UsePackItemRowProps = {
	mutations: ItemMutations;
	moveToCloset?: (packItemId: number) => void;
};

export const usePackItemRow = ({ mutations, moveToCloset }: UsePackItemRowProps) => {
	const { edit, delete: deleteMutation } = mutations;

	const handleSave = (packItem: BaseTableRowItem) => {
		const { packItemId, packItemUrl } = packItem;
		const cleanUrl = normalizeURL(packItemUrl);

		edit.mutate({
			packItemId,
			packItem: { ...packItem, packItemUrl: cleanUrl },
		});
	};

	const handleDelete = (packItemId: number, packId: number) => {
		deleteMutation.mutate({ packItemId, packId });
	};

	const handleMoveItemToCloset = (packItemId: number) => {
		moveToCloset && moveToCloset(packItemId);
	};

	// Combine edit/delete errors for API error display
	let apiError = { error: false, message: '' };
	if (edit.isError && edit.error) {
		apiError = {
			error: true,
			message: extractErrorMessage(edit.error) || 'Failed to save item',
		};
	} else if (deleteMutation.isError && deleteMutation.error) {
		apiError = {
			error: true,
			message: extractErrorMessage(deleteMutation.error) || 'Failed to delete item',
		};
	}

	return {
		apiError,
		handleSave,
		handleDelete,
		handleMoveItemToCloset,
	};
};

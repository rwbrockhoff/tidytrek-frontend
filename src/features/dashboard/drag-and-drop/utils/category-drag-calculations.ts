import { arrayMove } from '@dnd-kit/sortable';
import { type Category } from '@/types/pack-types';

export const calculateCategoryMove = (
	categories: Category[],
	activeId: string,
	overId: string,
): Category[] | null => {
	if (activeId === overId) return null;

	const oldIndex = categories.findIndex(
		(cat) => cat.packCategoryId.toString() === activeId,
	);
	const newIndex = categories.findIndex(
		(cat) => cat.packCategoryId.toString() === overId,
	);

	if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return null;

	return arrayMove(categories, oldIndex, newIndex);
};

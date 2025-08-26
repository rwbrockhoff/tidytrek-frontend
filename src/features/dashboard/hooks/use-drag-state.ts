import { useState, useCallback } from 'react';
import { type Category } from '@/types/pack-types';

export const useDragState = (categories: Category[]) => {
	const [isDragging, setIsDragging] = useState(false);
	const [tempCategories, setTempCategories] = useState<Category[] | null>(null);

	const displayCategories = tempCategories ?? categories;
	const startDrag = useCallback(() => {
		setIsDragging(true);
		setTempCategories(categories);
	}, [categories]);

	const updateDrag = useCallback(
		(newCategories: Category[]) => {
			// allow updates when we have temp state (during drag or after drop)
			if (isDragging || tempCategories !== null) {
				setTempCategories(newCategories);
			}
		},
		[isDragging, tempCategories],
	);

	const endDrag = useCallback(() => {
		setIsDragging(false);
		setTempCategories(null);
	}, []);

	const syncAndEndDrag = useCallback(() => {
		// Cache updated, switch back to TanStack state
		setIsDragging(false);
		setTempCategories(null);
	}, []);

	const completeDrag = useCallback(() => {
		setIsDragging(false);
		// Keep tempCategories until onSettled calls endDrag
	}, []);

	const resetDrag = useCallback(() => {
		setIsDragging(false);
		setTempCategories(null);
	}, []);

	return {
		isDragging,
		displayCategories,
		startDrag,
		updateDrag,
		completeDrag,
		endDrag,
		syncAndEndDrag,
		resetDrag,
	};
};

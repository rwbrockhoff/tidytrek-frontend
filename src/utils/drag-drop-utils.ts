import { QueryClient } from '@tanstack/react-query';

export type AdjacentItems<T> = {
	prevItem?: T;
	nextItem?: T;
};

// Figures out what items will be before/after a dragged item in its new position
// Needed for calculating the correct sort order when sending to the backend
export function calculateAdjacentItems<T>(
	allItems: T[],
	sourceIndex: number,
	destinationIndex: number,
): AdjacentItems<T> {
	let prevIndex, nextIndex;

	if (destinationIndex > sourceIndex) {
		prevIndex = destinationIndex;
		nextIndex = destinationIndex + 1;
	} else {
		prevIndex = destinationIndex - 1;
		nextIndex = destinationIndex;
	}

	const prevItem = prevIndex >= 0 ? allItems[prevIndex] : undefined;
	const nextItem = nextIndex < allItems.length ? allItems[nextIndex] : undefined;

	return { prevItem, nextItem };
}

// Instantly updates React Query cache when dragging items around
// for better drag & drop experience
export function applySynchronousDragUpdate<TQueryData>(
	// React Query expects key to be readonly
	queryClient: QueryClient,
	queryKey: readonly unknown[],
	sourceIndex: number,
	destinationIndex: number,
	arrayPath?: string,
) {
	queryClient.setQueryData<TQueryData>(
		queryKey,
		(old: TQueryData | undefined): TQueryData | undefined => {
			if (!old) return old;

			const oldAsRecord = old as unknown as Record<string, unknown>;
			const arrayToUpdate = arrayPath ? oldAsRecord[arrayPath] : old;
			if (!Array.isArray(arrayToUpdate)) return old;

			const result = Array.from(arrayToUpdate);
			const [removed] = result.splice(sourceIndex, 1);
			result.splice(destinationIndex, 0, removed);

			if (arrayPath) {
				return {
					...old,
					[arrayPath]: result,
				};
			}

			return result as TQueryData;
		},
	);
}

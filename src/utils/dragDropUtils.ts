import { QueryClient } from '@tanstack/react-query';

export type AdjacentItems<T> = {
	prevItem?: T;
	nextItem?: T;
};

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

export function applySynchronousDragUpdate<TData>(
	queryClient: QueryClient,
	queryKey: unknown[],
	sourceIndex: number,
	destinationIndex: number,
	arrayPath?: string
) {
	queryClient.setQueryData<TData>(queryKey, (old: any) => {
		if (!old) return old;

		const arrayToUpdate = arrayPath ? old[arrayPath] : old;
		if (!Array.isArray(arrayToUpdate)) return old;

		const result = Array.from(arrayToUpdate);
		const [removed] = result.splice(sourceIndex, 1);
		result.splice(destinationIndex, 0, removed);

		if (arrayPath) {
			return {
				...old,
				[arrayPath]: result
			};
		}
		
		return result;
	});
}

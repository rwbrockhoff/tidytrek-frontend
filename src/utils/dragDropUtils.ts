// Shared drag and drop utility for fractional indexing

export type AdjacentItems<T> = {
	prevItem?: T;
	nextItem?: T;
};

// Calculate adjacent items for fractional indexing drag operations
// Handles removing dragged item and finding adjacent items at drop position

export function calculateAdjacentItems<T>(
	allItems: T[],
	sourceIndex: number,
	destinationIndex: number,
): AdjacentItems<T> {
	// Remove the dragged item from the list to get accurate adjacent items
	const filteredItems = allItems.filter((_, index) => index !== sourceIndex);

	// For dropping at the end, use the filtered list length as destination
	// For other positions, adjust if we removed an item before the drop position
	let adjustedDestIndex;
	if (destinationIndex >= allItems.length - 1) {
		// Dropping at the end - use length of filtered items
		adjustedDestIndex = filteredItems.length;
	} else {
		// Dropping in middle - adjust if we removed an item before it
		adjustedDestIndex =
			destinationIndex > sourceIndex ? destinationIndex - 1 : destinationIndex;
	}

	// Get adjacent items at drop position
	const prevItem = filteredItems[adjustedDestIndex - 1];
	const nextItem = filteredItems[adjustedDestIndex];

	return { prevItem, nextItem };
}

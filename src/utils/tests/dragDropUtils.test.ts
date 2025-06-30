import { calculateAdjacentItems, applySynchronousDragUpdate } from '../dragDropUtils';
import { QueryClient } from '@tanstack/react-query';

describe('dragDropUtils', () => {
	describe('calculateAdjacentItems', () => {
		const testItems = ['A', 'B', 'C', 'D', 'E'];

		it('should calculate adjacent items when moving item down (source < destination)', () => {
			// Moving item at index 1 ('B') to index 3
			const result = calculateAdjacentItems(testItems, 1, 3);

			expect(result.prevItem).toBe('D'); // Item at destination index
			expect(result.nextItem).toBe('E'); // Item after destination
		});

		it('should calculate adjacent items when moving item up (source > destination)', () => {
			// Moving item at index 3 ('D') to index 1
			const result = calculateAdjacentItems(testItems, 3, 1);

			expect(result.prevItem).toBe('A'); // Item before destination
			expect(result.nextItem).toBe('B'); // Item at destination index
		});

		it('should handle moving to beginning of array', () => {
			const result = calculateAdjacentItems(testItems, 2, 0);

			expect(result.prevItem).toBeUndefined();
			expect(result.nextItem).toBe('A');
		});

		it('should handle moving to end of array', () => {
			const result = calculateAdjacentItems(testItems, 1, 4);

			expect(result.prevItem).toBe('E');
			expect(result.nextItem).toBeUndefined();
		});

		it('should handle single item array', () => {
			const result = calculateAdjacentItems(['A'], 0, 0);

			expect(result.prevItem).toBeUndefined();
			expect(result.nextItem).toBe('A'); // When destination = 0, nextItem is item at index 0
		});
	});

	describe('applySynchronousDragUpdate', () => {
		let queryClient: QueryClient;

		beforeEach(() => {
			queryClient = new QueryClient({
				defaultOptions: {
					queries: { retry: false },
					mutations: { retry: false },
				},
			});
		});

		it('should reorder array data correctly', () => {
			const initialData = ['A', 'B', 'C', 'D'];
			const queryKey = ['test-key'];

			// Set initial data
			queryClient.setQueryData(queryKey, initialData);

			// Move 'B' (index 1) to position 3
			applySynchronousDragUpdate(queryClient, queryKey, 1, 3);

			const result = queryClient.getQueryData(queryKey);
			expect(result).toEqual(['A', 'C', 'D', 'B']);
		});

		it('should reorder nested array data using arrayPath', () => {
			const initialData = {
				packList: ['Pack A', 'Pack B', 'Pack C'],
				otherData: 'unchanged', // Make sure we don't accidentally change other properties
			};
			const queryKey = ['nested-test'];

			queryClient.setQueryData(queryKey, initialData);

			// Move 'Pack C' (index 2) to position 0
			applySynchronousDragUpdate(queryClient, queryKey, 2, 0, 'packList');

			const result = queryClient.getQueryData(queryKey);
			expect(result).toEqual({
				packList: ['Pack C', 'Pack A', 'Pack B'],
				otherData: 'unchanged',
			});
		});

		it('should handle undefined query data gracefully', () => {
			const queryKey = ['nonexistent'];

			applySynchronousDragUpdate(queryClient, queryKey, 0, 1);

			const result = queryClient.getQueryData(queryKey);
			expect(result).toBeUndefined();
		});

		it('should handle non-array data gracefully', () => {
			const invalidData = { notAnArray: 'test' };
			const queryKey = ['invalid-data'];

			queryClient.setQueryData(queryKey, invalidData);
			applySynchronousDragUpdate(queryClient, queryKey, 0, 1);

			const result = queryClient.getQueryData(queryKey);
			expect(result).toEqual(invalidData); // Should remain unchanged
		});
	});
});

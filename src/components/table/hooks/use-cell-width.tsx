import { useMemo, useRef } from 'react';

// Preserves cell width during drag-and-drop to prevent table layout shifting
export const useCellWidth = (isDragging: boolean) => {
	const ref = useRef<HTMLTableCellElement | null>(null);
	return useMemo(() => {
		return { ref, width: ref.current?.offsetWidth || 'inherit' };
	}, [isDragging]);
};

import { useEffect, useRef } from 'react';

// Preserves cell width during drag-and-drop to prevent table layout shifting
export const useCellWidth = (isDragging: boolean) => {
	const ref = useRef<HTMLTableCellElement | null>(null);
	const savedWidth = useRef<number | null>(null);

	useEffect(() => {
		if (ref.current && !savedWidth.current) {
			// Capture the width once when component mounts
			savedWidth.current = ref.current.offsetWidth;
		}
	}, []);

	const width = isDragging && savedWidth.current ? savedWidth.current : 'inherit';
	
	return { ref, width };
};

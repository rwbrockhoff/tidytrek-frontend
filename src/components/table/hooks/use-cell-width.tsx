import { useMemo, useRef } from 'react';

export const useCellWidth = (isDragging: boolean) => {
	const ref = useRef<HTMLTableCellElement | null>(null);
	return useMemo(() => {
		return { ref, width: ref.current?.offsetWidth || 'inherit' };
	}, [isDragging]);
};

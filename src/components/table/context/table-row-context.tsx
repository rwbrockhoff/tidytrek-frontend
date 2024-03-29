import { createContext } from 'react';
import { type PackItem } from '@/types/pack-types';
import { InputEvent, SelectEvent } from '@/types/form-types';

type TableRowContext = {
	packItem: PackItem | null;
	onChange: ((e: InputEvent | SelectEvent) => void) | undefined;
	isDragging: boolean;
};

export const TableRowContext = createContext<TableRowContext>({
	packItem: null,
	onChange: undefined,
	isDragging: false,
});

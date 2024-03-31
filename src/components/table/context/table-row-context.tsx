import { createContext } from 'react';
import { type PackItem } from '@/types/pack-types';
import { InputEvent, SelectEvent } from '@/types/form-types';
import { ZodFormErrors } from '@/hooks';

type TableRowContext = {
	packItem: PackItem | null;
	onChange: ((e: InputEvent | SelectEvent) => void) | undefined;
	isDragging: boolean;
	formErrors: ZodFormErrors<PackItem> | null;
};

export const TableRowContext = createContext<TableRowContext>({
	packItem: null,
	onChange: undefined,
	isDragging: false,
	formErrors: null,
});

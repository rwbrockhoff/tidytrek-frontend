import { createContext } from 'react';
import { type BaseTableRowItem, type PackItem } from '@/types/pack-types';
import { InputEvent, SelectEvent } from '@/types/form-types';
import { ZodFormErrors } from '@/hooks/form/use-zod-error';

type TableRowContext = {
	packItem: BaseTableRowItem | null;
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

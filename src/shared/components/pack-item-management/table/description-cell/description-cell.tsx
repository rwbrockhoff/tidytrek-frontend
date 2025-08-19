import { type InputEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type RefObject } from 'react';
import { mx, cn } from '@/styles/utils';
import { Table, TextField } from '@/components/alpine';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { useCellWidth } from '../hooks/use-cell-width';
import { useTableNavigation } from '@/shared/hooks/pack-item-management/use-table-navigation';

type DescriptionCellProps = {
	onToggleOff: () => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	isDragging: boolean;
	rowRef: RefObject<HTMLElement>;
};

export const DescriptionCell = ({
	onToggleOff,
	packItem,
	onChange,
	isDragging,
	rowRef,
}: DescriptionCellProps) => {
	const { isCreator } = useUserPermissionsContext();
	const { packItemDescription } = packItem || {};
	const { width, ref } = useCellWidth(isDragging);
	const { handleKeyDown } = useTableNavigation({ onSave: onToggleOff, rowRef });

	const handleToggleOff = () => isCreator && onToggleOff();

	return (
		<Table.Cell ref={ref} style={{ width }} onBlur={handleToggleOff} className="px-0">
			{isCreator ? (
				<TextField.Standalone
					variant="minimal"
					compact
					value={packItemDescription || ''}
					placeholder="Description"
					name={'packItemDescription'}
					onChange={onChange}
					onKeyDown={(e) => handleKeyDown(e, 'packItemDescription')}
					disabled={!isCreator}
					className={mx.textEllipsis}
				/>
			) : (
				<span className={cn(mx.textEllipsis, 'px-2')}>{packItemDescription || ''}</span>
			)}
		</Table.Cell>
	);
};

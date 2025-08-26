import { type InputEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type RefObject } from 'react';
import { mx, cn } from '@/styles/utils';
import { Table, TextField } from '@/components/alpine';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { useTableNavigation } from '@/shared/hooks/pack-item-management/use-table-navigation';

type DescriptionCellProps = {
	onToggleOff: () => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	rowRef: RefObject<HTMLElement>;
};

export const DescriptionCell = ({
	onToggleOff,
	packItem,
	onChange,
	rowRef,
}: DescriptionCellProps) => {
	const { isCreator } = usePermissions();
	const { packItemDescription } = packItem || {};
	const { handleKeyDown } = useTableNavigation({ onSave: onToggleOff, rowRef });

	const handleToggleOff = () => isCreator && onToggleOff();

	return (
		<Table.Cell onBlur={handleToggleOff} className="px-0">
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
					collapsibleError
				/>
			) : (
				<span className={cn(mx.textEllipsis, 'px-2')}>{packItemDescription || ''}</span>
			)}
		</Table.Cell>
	);
};

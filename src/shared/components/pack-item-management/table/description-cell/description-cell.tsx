import { type InputEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { mx, cn } from '@/styles/utils';
import { Table, TextField } from '@/components/alpine';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { useCellWidth } from '../hooks/use-cell-width';

type DescriptionCellProps = {
	onToggleOff: () => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	isDragging: boolean;
};

export const DescriptionCell = ({
	onToggleOff,
	packItem,
	onChange,
	isDragging,
}: DescriptionCellProps) => {
	const { isCreator } = useUserPermissionsContext();
	const { packItemDescription } = packItem || {};

	const { width, ref } = useCellWidth(isDragging);

	const handleToggleOff = () => isCreator && onToggleOff();

	return (
		<Table.Cell ref={ref} style={{ width }} onBlur={handleToggleOff} className="px-0">
			{isCreator ? (
				<TextField.Standalone
					variant="minimal"
					value={packItemDescription || ''}
					placeholder="Description"
					name={'packItemDescription'}
					onChange={onChange}
					disabled={!isCreator}
					className={mx.textEllipsis}
				/>
			) : (
				<span className={cn(mx.textEllipsis, 'px-2')}>
					{packItemDescription || ''}
				</span>
			)}
		</Table.Cell>
	);
};

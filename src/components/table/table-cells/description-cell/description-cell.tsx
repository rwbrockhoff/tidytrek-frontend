import { type InputEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { Table, TextField } from '@/components/alpine';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';
import { mx } from '@/styles/utils';

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
	isDragging 
}: DescriptionCellProps) => {
	const userView = useUserContext();
	const { packItemDescription } = packItem || {};

	const { width, ref } = useCellWidth(isDragging);

	const handleToggleOff = () => userView && onToggleOff();

	return (
		<Table.Cell ref={ref} style={{ width }} onBlur={handleToggleOff} className={mx.px0}>
			<TextField.Standalone
				variant="minimal"
				value={packItemDescription || ''}
				placeholder="Description"
				name={'packItemDescription'}
				onChange={onChange}
				disabled={!userView}
				className={mx.textEllipsis}
			/>
		</Table.Cell>
	);
};

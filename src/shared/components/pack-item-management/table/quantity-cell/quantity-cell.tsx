import { type InputEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { type RefObject } from 'react';
import { Badge, Text } from '@radix-ui/themes';
import { Table, TextField } from '@/components/alpine';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { useTableNavigation } from '@/shared/hooks/pack-item-management/use-table-navigation';
import { cn } from '@/styles/utils';
import tableStyles from '../table-main/table.module.css';

type QuantityCellProps = {
	onToggleOff: () => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	formErrors: ZodFormErrors<BaseTableRowItem> | null;
	rowRef: RefObject<HTMLElement>;
};

export const QuantityCell = ({
	onToggleOff,
	packItem,
	onChange,
	formErrors,
	rowRef,
}: QuantityCellProps) => {
	const { isCreator } = usePermissions();
	const { packItemQuantity } = packItem || {};
	const { handleKeyDown } = useTableNavigation({ onSave: onToggleOff, rowRef });

	const handleToggleOff = () => isCreator && onToggleOff();

	return (
		<Table.Cell
			className={cn(
				tableStyles.quantityColumn,
				!isCreator && tableStyles.quantityColumnGuestView,
			)}
			onBlur={handleToggleOff}>
			{isCreator ? (
				<TextField.Standalone
					name="packItemQuantity"
					value={packItemQuantity}
					type="number"
					step={1}
					inputMode="numeric"
					variant="minimal"
					compact
					disabled={!isCreator}
					data-invalid={formErrors?.packItemQuantity.error}
					onChange={onChange}
					onKeyDown={(e) => handleKeyDown(e, 'packItemQuantity')}
					style={{ textAlign: 'center' }}
					collapsibleError
				/>
			) : (
				<Badge radius="large" color="gray" highContrast>
					<Text>{`x ${packItemQuantity}`}</Text>
				</Badge>
			)}
		</Table.Cell>
	);
};

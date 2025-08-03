import { type InputEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { Badge, Text } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Table, TextField } from '@/components/alpine';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { useCellWidth } from '../hooks/use-cell-width';

type QuantityCellProps = {
	onToggleOff: () => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	isDragging: boolean;
	formErrors: ZodFormErrors<BaseTableRowItem> | null;
};

export const QuantityCell = ({
	onToggleOff,
	packItem,
	onChange,
	isDragging,
	formErrors,
}: QuantityCellProps) => {
	const { isCreator } = useUserPermissionsContext();
	const { packItemQuantity } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const handleToggleOff = () => isCreator && onToggleOff();

	return (
		<Table.Cell ref={ref} style={{ width }} textAlign="center" onBlur={handleToggleOff}>
			{isCreator ? (
				<TextField.Standalone
					name="packItemQuantity"
					value={packItemQuantity}
					type="number"
					step={1}
					inputMode="numeric"
					variant="minimal"
					disabled={!isCreator}
					data-invalid={formErrors?.packItemQuantity.error}
					onChange={onChange}
					style={{ textAlign: 'center' }}
				/>
			) : (
				<Flex className="justify-center">
					<Badge radius="large" color="gray" highContrast>
						<Text>{`x ${packItemQuantity}`}</Text>
					</Badge>
				</Flex>
			)}
		</Table.Cell>
	);
};

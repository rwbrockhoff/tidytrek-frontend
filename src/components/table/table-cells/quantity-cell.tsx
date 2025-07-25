import { useContext } from 'react';
import { Badge, Flex, Table, Text } from '@radix-ui/themes';
import { TextField } from '@/components/ui/alpine';
import { useUserContext } from '@/hooks/use-viewer-context';
import { TableRowContext } from '../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type ButtonProps = {
	onToggleOff: () => void;
};

export const QuantityCell = ({ onToggleOff }: ButtonProps) => {
	const userView = useUserContext();

	const { packItem, onChange, isDragging, formErrors } = useContext(TableRowContext);
	const { packItemQuantity } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const handleToggleOff = () => userView && onToggleOff();

	return (
		<Table.Cell ref={ref} style={{ width }} align="center" onBlur={handleToggleOff}>
			{userView ? (
				<TextField.Standalone
					name="packItemQuantity"
					value={packItemQuantity}
					type="number"
					step={1}
					inputMode="numeric"
					variant="minimal"
					disabled={!userView}
					data-invalid={formErrors?.packItemQuantity.error}
					onChange={onChange}
					style={{ textAlign: 'center' }}
				/>
			) : (
				<Flex justify="center">
					<Badge radius="large" color="gray" highContrast>
						<Text>{`x ${packItemQuantity}`}</Text>
					</Badge>
				</Flex>
			)}
		</Table.Cell>
	);
};

import styles from './table-row.module.css';
import { Table } from '@/components/alpine';
import { 
	ItemNameCell,
	PackWeightCell,
	PropertiesCell,
	QuantityCell,
	PriceCell,
	DescriptionCell,
} from '@/components/table/table-cells';
import { ActionButtons } from '@/components/table/table-buttons';
import { usePricingContext } from '@/hooks/auth/use-pricing-context';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { type PackItemProperty } from '@/types/pack-types';

type TableRowContentProps = {
	toggleRow: boolean;
	isDragging: boolean;
	provided: any;
	disabled?: boolean;
	onToggle: () => void;
	onChangeProperty: (property: PackItemProperty) => void;
	onMouseOver: () => void;
	onMouseLeave: () => void;
	children: React.ReactNode; // Action buttons content
};

export const TableRowContent = ({
	toggleRow,
	isDragging,
	provided,
	disabled,
	onToggle,
	onChangeProperty,
	onMouseOver,
	onMouseLeave,
	children
}: TableRowContentProps) => {
	const userView = useUserContext();
	const showPrices = usePricingContext();

	return (
		<Table.Row
			data-testid="pack-item-row"
			onMouseOver={onMouseOver}
			onMouseLeave={onMouseLeave}
			ref={provided.innerRef}
			className={`${styles.tableRow} ${isDragging ? styles.tableRowDragging : ''}`}
			{...provided.draggableProps}>
			
			<ItemNameCell
				displayIcon={toggleRow}
				dragProps={{ ...provided.dragHandleProps }}
				onToggleOff={onToggle}
			/>

			<DescriptionCell onToggleOff={onToggle} />

			<PropertiesCell
				onClick={onChangeProperty}
				isDisabled={!!disabled}
				display={toggleRow}
			/>

			<QuantityCell onToggleOff={onToggle} />

			<PackWeightCell
				onToggleOff={onToggle}
				onSelect={onChangeProperty}
			/>

			{showPrices && <PriceCell onToggleOff={onToggle} />}

			{userView && (
				<ActionButtons display={toggleRow}>
					{children}
				</ActionButtons>
			)}
		</Table.Row>
	);
};
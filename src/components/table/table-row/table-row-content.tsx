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
import { type PackItemProperty, type BaseTableRowItem } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';

type TableRowContentProps = {
	toggleRow: boolean;
	isDragging: boolean;
	provided: any;
	disabled?: boolean;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	formErrors: ZodFormErrors<any> | null;
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
	packItem,
	onChange,
	formErrors,
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
				packItem={packItem}
				onChange={onChange}
				isDragging={isDragging}
			/>

			<DescriptionCell 
				onToggleOff={onToggle} 
				packItem={packItem}
				onChange={onChange}
				isDragging={isDragging}
			/>

			<PropertiesCell
				onClick={onChangeProperty}
				isDisabled={!!disabled}
				display={toggleRow}
				packItem={packItem}
				isDragging={isDragging}
			/>

			<QuantityCell 
				onToggleOff={onToggle}
				packItem={packItem}
				onChange={onChange}
				isDragging={isDragging}
				formErrors={formErrors}
			/>

			<PackWeightCell
				onToggleOff={onToggle}
				onSelect={onChangeProperty}
				packItem={packItem}
				onChange={onChange}
				isDragging={isDragging}
				formErrors={formErrors}
			/>

			{showPrices && (
				<PriceCell 
					onToggleOff={onToggle}
					packItem={packItem}
					onChange={onChange}
					isDragging={isDragging}
					formErrors={formErrors}
				/>
			)}

			{userView && (
				<ActionButtons display={toggleRow} isDragging={isDragging}>
					{children}
				</ActionButtons>
			)}
		</Table.Row>
	);
};
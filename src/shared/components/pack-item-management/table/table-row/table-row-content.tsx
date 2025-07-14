import styles from './table-row.module.css';
import { Table } from '@/components/alpine';
import {
	ItemNameCell,
	PackWeightCell,
	PropertiesCell,
	QuantityCell,
	PriceCell,
	DescriptionCell,
} from '@/shared/components/pack-item-management/table';
import { ActionButtons } from '../action-buttons/action-buttons';
import { usePricingContext } from '@/hooks/auth/use-pricing-context';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { type PackItemProperty, type BaseTableRowItem } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';

type TableRowContentProps = {
	isDragging: boolean;
	provided: any;
	disabled?: boolean;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	formErrors: ZodFormErrors<any> | null;
	onToggle: () => void;
	onChangeProperty: (property: PackItemProperty) => void;
	children: React.ReactNode;
};

export const TableRowContent = ({
	isDragging,
	provided,
	disabled,
	packItem,
	onChange,
	formErrors,
	onToggle,
	onChangeProperty,
	children,
}: TableRowContentProps) => {
	const userView = useUserContext();
	const showPrices = usePricingContext();

	return (
		<Table.Row
			data-testid="pack-item-row"
			ref={provided.innerRef}
			className={`${styles.tableRow} ${isDragging ? styles.tableRowDragging : ''}`}
			{...provided.draggableProps}>
			<ItemNameCell
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

			{userView && <ActionButtons isDragging={isDragging}>{children}</ActionButtons>}
		</Table.Row>
	);
};

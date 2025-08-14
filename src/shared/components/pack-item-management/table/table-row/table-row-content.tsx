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
import { usePackPricing } from '@/hooks/pack/use-pack-pricing';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { type PackItemProperty, type BaseTableRowItem } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { type DraggableProvided } from 'react-beautiful-dnd';
import { useRef, type MutableRefObject } from 'react';

type TableRowContentProps = {
	isDragging: boolean;
	provided: DraggableProvided;
	disabled?: boolean;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	formErrors: ZodFormErrors<BaseTableRowItem> | null;
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
	const { isCreator } = useUserPermissionsContext();
	const showPrices = usePackPricing();
	const navigationRowRef = useRef<HTMLTableRowElement | null>(
		null,
	) as MutableRefObject<HTMLTableRowElement | null>;

	const setRowRefs = (element: HTMLTableRowElement | null) => {
		navigationRowRef.current = element;
		provided.innerRef(element);
	};

	return (
		<Table.Row
			data-testid="pack-item-row"
			ref={setRowRefs}
			className={`${styles.tableRow} ${isDragging ? styles.tableRowDragging : ''}`}
			{...provided.draggableProps}>
			<ItemNameCell
				dragProps={{ ...provided.dragHandleProps }}
				onToggleOff={onToggle}
				packItem={packItem}
				onChange={onChange}
				isDragging={isDragging}
				rowRef={navigationRowRef}
			/>

			<DescriptionCell
				onToggleOff={onToggle}
				packItem={packItem}
				onChange={onChange}
				isDragging={isDragging}
				rowRef={navigationRowRef}
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
				rowRef={navigationRowRef}
			/>

			<PackWeightCell
				onToggleOff={onToggle}
				onSelect={onChangeProperty}
				packItem={packItem}
				onChange={onChange}
				isDragging={isDragging}
				formErrors={formErrors}
				rowRef={navigationRowRef}
			/>

			{showPrices && (
				<PriceCell
					onToggleOff={onToggle}
					packItem={packItem}
					onChange={onChange}
					isDragging={isDragging}
					formErrors={formErrors}
					rowRef={navigationRowRef}
				/>
			)}

			{isCreator && <ActionButtons isDragging={isDragging}>{children}</ActionButtons>}
		</Table.Row>
	);
};

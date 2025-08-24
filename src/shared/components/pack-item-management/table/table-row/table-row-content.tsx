import styles from './table-row.module.css';
import tableStyles from '../table-main/table.module.css';
import hoverStyles from '../hover-styles.module.css';
import { Table } from '@/components/alpine';
import { cn } from '@/styles/utils';
import {
	ItemNameCell,
	PackWeightCell,
	PropertiesCell,
	QuantityCell,
	PriceCell,
	DescriptionCell,
	RowActionsMenu,
} from '@/shared/components/pack-item-management/table';
import { usePackPricing } from '@/hooks/pack/use-pack-pricing';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { type PackItemProperty, type BaseTableRowItem } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { useRef, type MutableRefObject } from 'react';
import { type DraggableAttributes } from '@dnd-kit/core';

type DragProvidedProps = {
	innerRef: (node: HTMLElement | null) => void;
	draggableProps: DraggableAttributes & {
		style: React.CSSProperties;
	};
	dragHandleProps: Record<string, unknown> | undefined | null;
};

type TableRowContentProps = {
	isDragging: boolean;
	provided: DragProvidedProps;
	disabled?: boolean;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	formErrors: ZodFormErrors<BaseTableRowItem> | null;
	onToggle: () => void;
	onChangeProperty: (property: PackItemProperty) => void;
	onMove: () => void;
	onMoveToCloset: () => void;
	onDelete: () => void;
	children: React.ReactNode;
	categoryId?: string;
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
	onMove,
	onMoveToCloset,
	onDelete,
	categoryId,
}: TableRowContentProps) => {
	const { isCreator } = usePermissions();
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
			className={cn(
				styles.tableRow,
				isDragging && !categoryId && styles.tableRowDraggingActive,
				'group relative',
			)}
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

			{isCreator && (
				<Table.Cell className={tableStyles.actionButtons}>
					<div className={hoverStyles.showOnHover}>
						<RowActionsMenu
							packItem={packItem}
							onMove={onMove}
							onMoveToCloset={onMoveToCloset}
							onDelete={onDelete}
						/>
					</div>
				</Table.Cell>
			)}
		</Table.Row>
	);
};

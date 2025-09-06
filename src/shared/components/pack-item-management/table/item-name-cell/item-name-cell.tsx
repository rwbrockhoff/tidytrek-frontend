import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type RefObject } from 'react';
import { Flex } from '@/components/layout';
import { TextField, Table } from '@/components/alpine';
import { GripButton } from '../grip-button/grip-button';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { LinkPopup } from './link-popup';
import { ReadOnlyItemName } from './read-only-item-name';
import { useTableNavigation } from '@/shared/hooks/pack-item-management/use-table-navigation';
import { mx } from '@/styles/utils';
import styles from './item-name-cell.module.css';

export type OnChange = (e: InputEvent | SelectEvent) => void;

type ItemNameCellProps = {
	dragProps: object;
	onToggleOff: () => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	isDragging: boolean;
	rowRef: RefObject<HTMLElement>;
};

export const ItemNameCell = (props: ItemNameCellProps) => {
	const { isCreator } = usePermissions();
	const { packItem, onChange, dragProps, onToggleOff, rowRef } = props;
	const { packItemName, packItemUrl } = packItem || {};
	const { handleKeyDown } = useTableNavigation({ onSave: onToggleOff, rowRef });

	const handleToggleOff = () => {
		isCreator && onToggleOff();
	};

	return (
		<Table.Cell onBlur={handleToggleOff} className={styles.styledCell}>
			<GripButton testId="pack-item-grip" disabled={!isCreator} {...dragProps} />

			{isCreator ? (
				<Flex className="inline-flex w-full">
					<TextField.Standalone
						value={packItemName || ''}
						name={'packItemName'}
						placeholder={'Name'}
						variant="minimal"
						compact
						onChange={onChange}
						onKeyDown={(e) => handleKeyDown(e, 'packItemName')}
						disabled={!isCreator}
						className={mx.textEllipsis}
						collapsibleError
					/>
					<LinkPopup packItemUrl={packItemUrl} onChange={onChange} />
				</Flex>
			) : (
				<ReadOnlyItemName packItemName={packItemName} packItemUrl={packItemUrl} />
			)}
		</Table.Cell>
	);
};

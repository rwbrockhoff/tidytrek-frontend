import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type RefObject } from 'react';
import { Flex } from '@/components/layout';
import { TextField, Table } from '@/components/alpine';
import { GripButton } from '../grip-button/grip-button';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { ExternalLink } from '@/components/ui';
import { LinkIcon } from '@/components/icons';
import { LinkPopup } from './link-popup';
import { useCellWidth } from '../hooks/use-cell-width';
import { useTableNavigation } from '@/shared/hooks/pack-item-management/use-table-navigation';
import { mx, cn } from '@/styles/utils';
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
	const { isCreator } = useUserPermissionsContext();
	const { packItem, onChange, isDragging, dragProps, onToggleOff, rowRef } = props;
	const { packItemName, packItemUrl } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);
	const { handleKeyDown } = useTableNavigation({ onSave: onToggleOff, rowRef });

	const handleToggleOff = () => {
		isCreator && onToggleOff();
	};

	return (
		<Table.Cell
			ref={ref}
			onBlur={handleToggleOff}
			style={{ width }}
			className={styles.styledCell}>
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
					/>
					<LinkPopup packItem={packItem} />
				</Flex>
			) : packItemUrl ? (
				<ExternalLink href={packItemUrl}>
					<LinkIcon />
					{packItemName || packItemUrl || 'Pack Item'}
				</ExternalLink>
			) : (
				<span className={cn(mx.textEllipsis, 'px-2')}>{packItemName || 'Name'}</span>
			)}
		</Table.Cell>
	);
};

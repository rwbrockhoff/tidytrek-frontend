import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { Flex } from '@radix-ui/themes';
import { TextField, Table } from '@/components/alpine';
import { GripButton } from '../../table-buttons';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { ExternalLink } from '@/components/ui';
import { LinkIcon } from '@/components/icons';
import { LinkPopup } from './link-popup';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';
import { mx } from '@/styles/utils';
import styles from './item-name-cell.module.css';

export type OnChange = (e: InputEvent | SelectEvent) => void;

type ItemNameCellProps = {
	displayIcon: boolean;
	dragProps: object;
	onToggleOff: () => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	isDragging: boolean;
};

export const ItemNameCell = (props: ItemNameCellProps) => {
	const userView = useUserContext();
	const { packItem, onChange, isDragging, displayIcon, dragProps, onToggleOff } = props;
	const { packItemName, packItemUrl } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const handleToggleOff = () => {
		userView && onToggleOff();
	};

	return (
		<Table.Cell
			ref={ref}
			onBlur={handleToggleOff}
			style={{ width }}
			className={styles.styledCell}>
			<GripButton
				display={displayIcon && userView}
				testId="pack-item-grip"
				{...dragProps}
			/>

			{userView ? (
				<Flex display="inline-flex" width="100%">
					<TextField.Standalone
						value={packItemName || ''}
						name={'packItemName'}
						placeholder={'Name'}
						variant="minimal"
						onChange={onChange}
						disabled={!userView}
						className={mx.textEllipsis}
					/>
					<LinkPopup displayIcon={displayIcon} packItem={packItem} />
				</Flex>
			) : packItemUrl ? (
				<ExternalLink href={packItemUrl}>
					<LinkIcon />
					{packItemName || packItemUrl || 'Pack Item'}
				</ExternalLink>
			) : (
				<TextField.Standalone
					value={packItemName || ''}
					name={'packItemName'}
					placeholder={'Name'}
					variant="minimal"
					onChange={onChange}
					disabled={!userView}
					className={mx.textEllipsis}
				/>
			)}
		</Table.Cell>
	);
};

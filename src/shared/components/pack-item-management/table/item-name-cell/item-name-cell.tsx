import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { Flex } from '@/components/layout';
import { TextField, Table } from '@/components/alpine';
import { GripButton } from '../grip-button/grip-button';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { ExternalLink } from '@/components/ui';
import { LinkIcon } from '@/components/icons';
import { LinkPopup } from './link-popup';
import { useCellWidth } from '../hooks/use-cell-width';
import { mx } from '@/styles/utils';
import styles from './item-name-cell.module.css';

export type OnChange = (e: InputEvent | SelectEvent) => void;

type ItemNameCellProps = {
	dragProps: object;
	onToggleOff: () => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	isDragging: boolean;
};

export const ItemNameCell = (props: ItemNameCellProps) => {
	const userView = useUserContext();
	const { packItem, onChange, isDragging, dragProps, onToggleOff } = props;
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
				testId="pack-item-grip"
				{...dragProps}
			/>

			{userView ? (
				<Flex className="inline-flex w-full">
					<TextField.Standalone
						value={packItemName || ''}
						name={'packItemName'}
						placeholder={'Name'}
						variant="minimal"
						onChange={onChange}
						disabled={!userView}
						className={mx.textEllipsis}
					/>
					<LinkPopup packItem={packItem} isDragging={isDragging} />
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

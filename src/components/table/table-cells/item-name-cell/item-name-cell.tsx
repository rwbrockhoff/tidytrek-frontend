import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { useContext } from 'react';
import { Flex } from '@radix-ui/themes';
import { TextField, Table } from '@/components/ui/alpine';
import { GripButton, MobileToggleButton } from '../../table-buttons';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { ExternalLink, LinkIcon } from '@/components/ui';
import { LinkPopup } from './link-popup';
import { TableRowContext } from '../../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';
import { mx } from '@/styles/utils';
import styles from './item-name-cell.module.css';

export type OnChange = (e: InputEvent | SelectEvent) => void;

type ItemNameCellProps = {
	displayIcon: boolean;
	dragProps: object;
	onToggleOff: () => void;
	toggleMobileView: () => void;
};

export const ItemNameCell = (props: ItemNameCellProps) => {
	const userView = useUserContext();
	const { packItem, onChange, isDragging } = useContext(TableRowContext);
	const { packItemName, packItemUrl } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const { displayIcon, dragProps } = props;
	const { onToggleOff, toggleMobileView } = props;

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
					<MobileToggleButton onToggle={toggleMobileView} />
					<LinkPopup displayIcon={displayIcon} />
				</Flex>
			) : packItemUrl ? (
				<ExternalLink href={packItemUrl}>
					<LinkIcon size={16} />
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

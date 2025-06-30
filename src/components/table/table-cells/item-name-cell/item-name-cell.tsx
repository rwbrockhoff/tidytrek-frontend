import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { useContext } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { TextField } from '@/components/ui/alpine';
import { Table } from '@radix-ui/themes';
import { GripButton, MobileToggleButton } from '../../table-buttons';
import { useUserContext } from '@/hooks/use-viewer-context';
import { DisplayLink } from '@/components/ui';
import { LinkPopup } from './link-popup';
import { TableRowContext } from '../../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';
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
					/>
					<MobileToggleButton onToggle={toggleMobileView} />
					<LinkPopup displayIcon={displayIcon} />
				</Flex>
			) : (
				<Box ml="2">
					{packItemUrl ? (
						<DisplayLink
							url={packItemUrl || ''}
							text={packItemName || packItemUrl || 'Pack Item'}
							showIcon
						/>
					) : (
						<Text>{packItemName}</Text>
					)}
				</Box>
			)}
		</Table.Cell>
	);
};

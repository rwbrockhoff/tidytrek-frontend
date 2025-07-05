import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { useContext } from 'react';
import { Flex } from '@radix-ui/themes';
import { TextField } from '@/components/ui/alpine';
import { TableCell } from '@/components/ui/alpine';
import { GripButton, MobileToggleButton } from '../../table-buttons';
import { useUserContext } from '@/hooks/use-viewer-context';
import { DisplayLink } from '@/components/ui';
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
		<TableCell
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
				<DisplayLink
					url={packItemUrl || ''}
					text={packItemName || packItemUrl || 'Pack Item'}
					showIcon
				/>
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
		</TableCell>
	);
};

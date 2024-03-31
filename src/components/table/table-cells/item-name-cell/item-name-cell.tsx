import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { useContext } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, TextField } from '@radix-ui/themes';
import { Table } from '@radix-ui/themes';
import { GripButton, MobileToggleButton } from '../../table-buttons';
import { useUserContext } from '@/hooks/use-viewer-context';
import { DisplayLink } from '@/components/ui';
import { LinkPopup } from './link-popup';
import { TableRowContext } from '../../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

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
		<StyledCell ref={ref} onBlur={handleToggleOff} style={{ width }}>
			<GripButton display={displayIcon && userView} {...dragProps} />

			{userView ? (
				<Flex display="inline-flex" width="100%">
					<TextField.Input
						value={packItemName || ''}
						name={'packItemName'}
						placeholder={'Name'}
						onChange={onChange}
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
		</StyledCell>
	);
};

const StyledCell = styled(Table.Cell)`
	position: relative;
	.rt-TextFieldRoot {
		flex-grow: 1;
	}
	input {
		${({ theme: t }) =>
			t.mx.mobile(`
				height: 40px;
			`)}
	}
`;

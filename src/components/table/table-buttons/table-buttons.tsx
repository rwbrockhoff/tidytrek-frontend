import styled, { css } from 'styled-components';
import { Flex, Table, Button, IconButton } from '@radix-ui/themes';
import { PlusIcon, CaretDownIcon, ShareIcon, GripIcon } from '@/components/ui';
import { useContext } from 'react';
import { TableRowContext } from '../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type ActionButtonsProps = {
	header?: boolean;
	size?: number;
	display?: boolean;
	children: React.ReactNode;
};

export const ActionButtons = (props: ActionButtonsProps) => {
	const { header, display = true, children } = props;

	const { isDragging } = useContext(TableRowContext);
	const { ref, width } = useCellWidth(isDragging);

	if (header) {
		return (
			<StyledHeaderCell justify="center">
				<StyledFlex $display={display}>{children}</StyledFlex>
			</StyledHeaderCell>
		);
	} else {
		return (
			<Table.Cell valign="middle" ref={ref} style={{ width }}>
				<StyledFlex $display={display}>{children}</StyledFlex>
			</Table.Cell>
		);
	}
};

const StyledHeaderCell = styled(Table.ColumnHeaderCell)`
	${({ theme: t }) =>
		t.mx.mobile(`
			width: 25%;	
	`)}
`;

const StyledFlex = styled(Flex)<{ $display: boolean }>`
	height: 100%;
	justify-content: space-around;
	opacity: ${({ $display }) => ($display ? 1 : 0)};
	svg {
		cursor: pointer;
		color: var(--gray-9);
		&:hover {
			filter: brightness(80%);
		}
	}
	${({ theme: t }) =>
		t.mx.mobile(`
			opacity: 1;
			width: 100%;
	`)}
`;

type MobileToggleProps = {
	onToggle: () => void;
};

export const MobileToggleButton = ({ onToggle }: MobileToggleProps) => {
	return (
		<TableButton
			onClick={onToggle}
			$mobileOnly
			$marginLeft="15px"
			style={{ fontSize: '1.1em' }}>
			<CaretDownIcon />
		</TableButton>
	);
};

type MoveButtonProps = {
	display: boolean;
	onToggle: () => void;
};

export const MoveItemButton = ({ display, onToggle }: MoveButtonProps) => {
	return (
		<TableButton onClick={onToggle} $display={display}>
			<ShareIcon />
		</TableButton>
	);
};

export const AddCategoryButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button variant="outline" color="gray" size="2" radius="medium" onClick={onClick}>
			<PlusIcon />
			Add Category
		</Button>
	);
};

export const GripButton = ({ display, ...props }: { display: boolean }) => {
	return (
		<GripContainer align="center" justify="center" $display={display} {...props}>
			<GripIcon />
		</GripContainer>
	);
};

export const TableButton = styled(IconButton)<{
	$display?: boolean;
	$marginLeft?: string;
	$mobileOnly?: boolean;
}>`
	${(props) =>
		props.$mobileOnly &&
		css`
			display: none;
			${({ theme: t }) =>
				t.mx.mobile(`
					display: block;
				`)}
		`}
	background-color: transparent;
	cursor: pointer;
	color: grey;
	margin: 0px 0px;
	margin-left: ${({ $marginLeft }) => ($marginLeft ? $marginLeft : 0)};
	opacity: ${({ $display }) => ($display ? 1 : 0)};
	padding: 5px;
	icon:hover {
		color: black;
	}
	input {
		height: 30px;
	}
	${({ theme: t }) =>
		t.mx.mobile(`
			opacity: 1;
		`)}
`;

const GripContainer = styled(Flex)<{ $display: boolean }>`
	position: absolute;
	color: var(--gray-8);
	top: 0px;
	left: -60px;
	z-index: 100;
	width: 60px;
	height: 44px;
	margin-left: 15px;
	touch-action: manipulation;
	opacity: 0;
	${({ $display }) =>
		$display &&
		css`
			opacity: 1;
			cursor: pointer;
		`}
`;

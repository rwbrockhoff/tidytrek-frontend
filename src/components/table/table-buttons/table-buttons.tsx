import styled, { css } from 'styled-components';
import { Flex, Table, Button, IconButton } from '@radix-ui/themes';
import { PlusIcon, CaretDownIcon, ShareIcon, GripIcon } from '@/components/ui';

type ActionButtonsProps = {
	header?: boolean;
	size?: number;
	display?: boolean;
	children: React.ReactNode;
};

export const ActionButtons = (props: ActionButtonsProps) => {
	const { header, display = true, children } = props;

	if (header) {
		return (
			<StyledHeaderCell justify="center">
				<StyledFlex style={{ opacity: display ? 1 : 1 }}>
					{display && children}
				</StyledFlex>
			</StyledHeaderCell>
		);
	} else {
		return (
			<Table.Cell valign="middle">
				<StyledFlex align="center" style={{ opacity: display ? 1 : 0 }}>
					{children}
				</StyledFlex>
			</Table.Cell>
		);
	}
};

const StyledHeaderCell = styled(Table.ColumnHeaderCell)`
	${({ theme: t }) =>
		t.mx.mobile(`
			display: inline-flex;
			border-radius: 0 !important;
			width: fit-content;
			.icon {
				margin-right: 10px !important;
			}
	`)}
`;

const StyledFlex = styled(Flex)`
	height: 100%;
	justify-content: space-around;
	svg {
		cursor: pointer;
		color: var(--gray-9);
		&:hover {
			filter: brightness(80%);
		}
	}
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
	if (display) {
		return (
			<GripContainer align="center" justify="center" {...props}>
				<GripIcon />
			</GripContainer>
		);
	} else return null;
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

const GripContainer = styled(Flex)`
	position: absolute;
	color: var(--gray-8);
	top: 0px;
	left: -60px;
	z-index: 100;
	width: 60px;
	height: 44px;
	margin-left: 15px;
	touch-action: manipulation;
`;

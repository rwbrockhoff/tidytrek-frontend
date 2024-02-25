import {
	Button as SemButton,
	Input as SemInput,
	Icon as SemIcon,
	ModalHeader as SemModalHeader,
	Checkbox as SemCheckbox,
	Table as SemTable,
} from 'semantic-ui-react';
import styled, { css } from 'styled-components';

export const Button = styled(SemButton)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				background-color: ${props.theme[props.$themeColor]};
				color: white;
			`};

		${(props) =>
			props.$footerButton &&
			css`
				margin-top: 5px;
				margin-left: 10px;
			`};
	}
`;

export const Input = styled(SemInput)`
	&&& {
		input:focus {
			border-color: ${(props) => props.theme.primary};
		}
	}
`;

export const Icon = styled(SemIcon)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				color: ${props.theme[props.$themeColor]};
			`};
	}
`;

export const Table = styled(SemTable)<{ $themeColor?: string }>`
	&&& {
		border-top: ${(props) =>
			props.$themeColor ? `0.3em solid ${props.theme[props.$themeColor]}` : 'inherit'};

		${(props) =>
			props.$minimalPadding &&
			css`
				td {
					padding: 0.2em 0.2em;
				}
			`};
	}
`;

export const TableCell = styled(Table.Cell)<{ $overflow?: boolean }>`
	&&&& {
		overflow: ${(props) => (props.$overflow ? 'visible' : 'inherit')};
	}
`;

export const ModalHeader = styled(SemModalHeader)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				background-color: ${props.theme[props.$themeColor]};
				color: white;
			`};
	}
`;

export const Checkbox = styled(SemCheckbox)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
                    .ui.toggle.checkbox input:checked~label:before {
                    background-color: ${props.theme[props.$themeColor]};
                }
				}
			`};
	}
`;

// .ui.toggle.checkbox input:checked~label:before {
//     background-color: #2185d0;
// }
// .ui.toggle.checkbox input:checked~.box:before, .ui.toggle.checkbox input:checked~label:before {
//     background-color: #2185d0;
// }

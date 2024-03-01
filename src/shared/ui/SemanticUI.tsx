import {
	Button as SemButton,
	Input as SemInput,
	Header as SemHeader,
	Icon as SemIcon,
	ModalHeader as SemModalHeader,
	Checkbox as SemCheckbox,
	Table as SemTable,
	FormField as SemFormField,
} from 'semantic-ui-react';
import styled, { css } from 'styled-components';

export const Button = styled(SemButton)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				background-color: ${props.theme.user[props.$themeColor]};
				color: white;
			`};

		${(props) =>
			props.$footerButton &&
			css`
				margin-top: 5px;
				margin-left: 10px;
			`};
		&:hover {
			filter: brightness(95%);
		}
	}
`;

export const Input = styled(SemInput)`
	&&& {
		input:focus {
			border-color: ${({ theme }) => theme.user.primary};
		}
	}
`;

export const Header = styled(SemHeader)<{ $marginBottom?: string }>`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				color: ${props.theme.user[props.$themeColor]};
			`};
		margin-bottom: ${(props) => (props.$marginBottom ? props.$marginBottom : '1rem')};
	}
`;

export const Icon = styled(SemIcon)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				color: ${props.theme.user[props.$themeColor]};
			`};
	}
`;

export const Table = styled(SemTable)<{ $themeColor?: string }>`
	&&& {
		border-top: ${(props) =>
			props.$themeColor
				? `0.3em solid ${props.theme.user[props.$themeColor]}`
				: 'inherit'};

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
				background-color: ${props.theme.user[props.$themeColor]};
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
                    background-color: ${props.theme.user[props.$themeColor]};
                }
				}
			`};
	}
`;

export const FormField = styled(SemFormField)<{ $width: string }>`
	width: ${({ $width }) => $width};
	${({ theme: t }) =>
		t.mx.mobile(`
			width: 100%;
	`)}
`;

// .ui.toggle.checkbox input:checked~label:before {
//     background-color: #2185d0;
// }
// .ui.toggle.checkbox input:checked~.box:before, .ui.toggle.checkbox input:checked~label:before {
//     background-color: #2185d0;
// }

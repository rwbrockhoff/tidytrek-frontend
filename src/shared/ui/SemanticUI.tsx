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
	}
`;

export const Input = styled(SemInput)``;

export const Icon = styled(SemIcon)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				color: ${props.theme[props.$themeColor]};
			`};
	}
`;

export const Table = styled(SemTable)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				border-top: 0.3em solid ${props.theme[props.$themeColor]};
			`};
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
//     background-color: #2185d0!important;
// }
// .ui.toggle.checkbox input:checked~.box:before, .ui.toggle.checkbox input:checked~label:before {
//     background-color: #2185d0!important;
// }

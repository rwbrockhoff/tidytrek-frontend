import {
	Button as SemanticButton,
	ModalHeader as SemanticModalHeader,
	Checkbox as SemanticCheckbox,
	Table as SemanticTable,
} from 'semantic-ui-react';
import styled, { css } from 'styled-components';

export const Button = styled(SemanticButton)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				background-color: ${props.theme[props.$themeColor]};
				color: white;
			`};
	}
`;

export const Table = styled(SemanticTable)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				border-top: 0.3em solid ${props.theme[props.$themeColor]};
			`};
	}
`;

export const ModalHeader = styled(SemanticModalHeader)`
	&&& {
		${(props) =>
			props.$themeColor &&
			css`
				background-color: ${props.theme[props.$themeColor]};
				color: white;
			`};
	}
`;

export const Checkbox = styled(SemanticCheckbox)`
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

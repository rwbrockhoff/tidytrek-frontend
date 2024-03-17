import { Button } from '@radix-ui/themes';
import { MdOutlineClose as DeleteIcon } from 'react-icons/md';
import styled from 'styled-components';

type DeleteButtonProps = {
	disabled?: boolean;
	onClick: () => void;
};

export const DeleteButton = ({ disabled, onClick }: DeleteButtonProps) => {
	return (
		<StyledButton color="gray" disabled={disabled} onClick={onClick}>
			<DeleteIcon />
		</StyledButton>
	);
};

const StyledButton = styled(Button)`
	position: absolute;
	z-index: 10;
	top: -10px;
	right: -10px;
	${({ theme: t }) => t.mx.wh('30px')};
	border-radius: 15px;
	cursor: pointer;
	${({ theme: t }) => t.mx.themeBgColor('tidyLightGrey', 'tidy')};
	color: black;
	&:hover {
		filter: brightness(95%);
	}
`;

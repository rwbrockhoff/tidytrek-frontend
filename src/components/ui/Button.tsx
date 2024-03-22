import { IconButton } from '@radix-ui/themes';
import { MdOutlineClose as DeleteIcon } from 'react-icons/md';
import styled from 'styled-components';

type DeleteButtonProps = {
	disabled?: boolean;
	onClick: () => void;
};

export const DeleteButton = ({ disabled, onClick }: DeleteButtonProps) => {
	return (
		<StyledButton color="gray" radius="full" disabled={disabled} onClick={onClick}>
			<DeleteIcon />
		</StyledButton>
	);
};

const StyledButton = styled(IconButton)`
	position: absolute;
	z-index: 10;
	top: -5px;
	right: -5px;
	cursor: pointer;
	background-color: var(--gray-5);
	color: black;
	&:hover {
		filter: brightness(95%);
	}
`;

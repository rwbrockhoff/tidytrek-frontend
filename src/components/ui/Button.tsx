import { IconButton } from '@radix-ui/themes';
import { MdOutlineClose as DeleteIcon } from 'react-icons/md';
import styles from './button.module.css';

type DeleteButtonProps = {
	disabled?: boolean;
	onClick: () => void;
};

export const DeleteButton = ({ disabled, onClick }: DeleteButtonProps) => {
	return (
		<IconButton 
			color="gray" 
			radius="full" 
			disabled={disabled} 
			onClick={onClick}
			className={styles.deleteButton}
		>
			<DeleteIcon />
		</IconButton>
	);
};

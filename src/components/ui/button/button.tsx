import { IconButton } from '@radix-ui/themes';
import { DeleteIcon } from 'lucide-react';
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
			className={styles.deleteButton}>
			<DeleteIcon size={16} />
		</IconButton>
	);
};

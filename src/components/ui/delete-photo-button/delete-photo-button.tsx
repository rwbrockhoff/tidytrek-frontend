import { IconButton } from '@radix-ui/themes';
import { TrashIcon } from '@/components/ui';
import styles from './delete-photo-button.module.css';

type DeletePhotoButtonProps = {
	disabled?: boolean;
	onClick: () => void;
};

export const DeletePhotoButton = ({ disabled, onClick }: DeletePhotoButtonProps) => {
	return (
		<IconButton
			color="gray"
			radius="full"
			disabled={disabled}
			onClick={onClick}
			className={styles.deletePhotoButton}>
			<TrashIcon size={16} />
		</IconButton>
	);
};

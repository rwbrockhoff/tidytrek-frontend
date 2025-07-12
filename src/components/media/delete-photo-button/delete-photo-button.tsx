import { Button } from '@/components/alpine';
import { TrashIcon } from '@/components/icons';
import styles from './delete-photo-button.module.css';

type DeletePhotoButtonProps = {
	disabled?: boolean;
	onClick: () => void;
};

export const DeletePhotoButton = ({ disabled, onClick }: DeletePhotoButtonProps) => {
	return (
		<Button
			variant="ghost"
			size="sm"
			radius="circle"
			disabled={disabled}
			onClick={onClick}
			className={styles.deletePhotoButton}
			iconLeft={<TrashIcon />}
		/>
	);
};

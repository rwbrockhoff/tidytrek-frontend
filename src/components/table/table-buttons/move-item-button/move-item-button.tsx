import { IconButton } from '@radix-ui/themes';
import { cn } from '@/styles/utils';
import { ShareIcon } from '@/components/ui';
import styles from './move-item-button.module.css';

type MoveButtonProps = {
	display: boolean;
	onToggle: () => void;
};

export const MoveItemButton = ({ display, onToggle }: MoveButtonProps) => {
	return (
		<IconButton
			onClick={onToggle}
			className={cn(styles.tableButton, !display && styles.tableButtonHidden)}
			aria-label="Drag pack item">
			<ShareIcon />
		</IconButton>
	);
};
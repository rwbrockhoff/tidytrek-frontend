import { cn } from '@/styles/utils/cn';
import styles from './sidebar-button.module.css';
import { Button } from '@radix-ui/themes';
import { SidebarIcon } from '@/components/ui';

type SidebarButtonProps = {
	onClick: () => void;
	isSidebar: boolean;
};

export const SidebarButton = ({ onClick, isSidebar }: SidebarButtonProps) => {
	return (
		<Button
			className={cn(styles.sidebarButton, isSidebar && styles.isSidebar)}
			onClick={onClick}
			variant="ghost"
			color="gray"
			size="3"
			mt="6">
			<SidebarIcon />
		</Button>
	);
};

import { cn } from '@/styles/utils';
import styles from './sidebar-button.module.css';
import { Button } from '@/components/alpine';
import { SidebarIcon, CloseIcon, BackArrow } from '@/components/icons';

type SidebarButtonProps = {
	onClick: () => void;
	isSidebar: boolean;
	isMobile?: boolean;
};

export const SidebarButton = ({ onClick, isSidebar, isMobile }: SidebarButtonProps) => {
	return (
		<Button
			className={cn(styles.sidebarButton, isSidebar && styles.isSidebar)}
			onClick={onClick}
			variant="ghost">
			{isSidebar ? (
				isMobile ? (
					<CloseIcon className="lucide-sm" />
				) : (
					<BackArrow className="lucide-sm" />
				)
			) : (
				<SidebarIcon className="lucide-sm" />
			)}
		</Button>
	);
};

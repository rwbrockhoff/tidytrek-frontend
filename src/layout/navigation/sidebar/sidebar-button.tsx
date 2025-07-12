import { cn, mx } from '@/styles/utils';
import styles from './sidebar-button.module.css';
import { Button } from '@/components/alpine';
import { SidebarIcon, BackArrow } from '@/components/icons';

type SidebarButtonProps = {
	onClick: () => void;
	isSidebar: boolean;
};

export const SidebarButton = ({ onClick, isSidebar }: SidebarButtonProps) => {
	return (
		<Button
			className={cn(
				styles.sidebarButton,
				isSidebar && styles.isSidebar,
				isSidebar && mx.mobileHidden,
			)}
			onClick={onClick}
			variant="ghost">
			{isSidebar ? (
				<BackArrow className="lucide-sm" />
			) : (
				<SidebarIcon className="lucide-sm" />
			)}
		</Button>
	);
};

import { cn, mx } from '@/styles/utils';
import styles from './sidebar-button.module.css';
import { Button } from '@radix-ui/themes';
import { SidebarIcon, LeftDoubleChevronIcon } from '@/components/ui';

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
				!isSidebar && mx.mobileHidden,
			)}
			onClick={onClick}
			variant="ghost"
			color="gray">
			{isSidebar ? <LeftDoubleChevronIcon /> : <SidebarIcon />}
		</Button>
	);
};

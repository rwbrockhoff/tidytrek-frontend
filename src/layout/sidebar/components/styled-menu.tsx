import styles from './styled-menu.module.css';
import { cn } from '@/styles/utils';

interface StyledMenuProps {
	children: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
}

export const StyledMenu = ({ children, style, className, ...props }: StyledMenuProps) => (
	<menu className={cn(styles.styledMenu, className)} style={style} {...props}>
		{children}
	</menu>
);

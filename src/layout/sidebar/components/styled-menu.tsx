import styles from './styled-menu.module.css';
import { cn } from '@/styles/utils';

interface StyledMenuProps {
	darkText?: boolean;
	children: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
}

export const StyledMenu = ({ darkText, children, style, className, ...props }: StyledMenuProps) => (
	<menu 
		className={cn(styles.styledMenu, darkText && styles.darkText, className)}
		style={style}
		{...props}
	>
		{children}
	</menu>
);

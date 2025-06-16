import styles from './styled-menu.module.css';

interface StyledMenuProps {
	darkText?: boolean;
	children: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
}

export const StyledMenu = ({ darkText, children, style, className, ...props }: StyledMenuProps) => (
	<menu 
		className={`${styles.styledMenu} ${className || ''}`}
		style={{
			'--menu-text-color': darkText ? 'black' : 'inherit',
			...style
		} as React.CSSProperties}
		{...props}
	>
		{children}
	</menu>
);

import styles from './tidyui.module.css';

interface PanelProps {
	width: string;
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

export const SubText = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
	<p className={`${styles.subText} ${className || ''}`} {...props}>
		{children}
	</p>
);

export const Panel = ({ width, className, children, style, ...props }: PanelProps) => (
	<div 
		className={`${styles.panel} ${className || ''}`} 
		style={{ '--panel-width': width, ...style } as React.CSSProperties}
		{...props}
	>
		{children}
	</div>
);

import { Link as RouterLink } from 'react-router-dom';
import { cn } from '@/styles/utils';
import styles from './link.module.css';

type LinkProps = {
	to: string | undefined;
	children: React.ReactNode;
	enabled?: boolean;
	className?: string;
};

export const Link = (props: LinkProps) => {
	const { to, enabled = true, className = '', children } = props;

	if (!enabled || !to) return children;

	return (
		<RouterLink to={to} className={cn(styles.link, className)}>
			{children}
		</RouterLink>
	);
};

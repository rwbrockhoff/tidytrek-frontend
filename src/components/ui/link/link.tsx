import { Link as RouterLink } from 'react-router-dom';
import { cn } from '@/styles/utils';
import styles from './link.module.css';

type LinkProps = {
	to: string | undefined;
	children: React.ReactNode;
	enabled?: boolean;
	className?: string;
	viewTransition?: boolean;
};

export const Link = (props: LinkProps) => {
	const { to, enabled = true, className = '', children, viewTransition = true } = props;

	if (!enabled || !to) return children;

	return (
		<RouterLink to={to} className={cn(styles.link, className)} viewTransition={viewTransition}>
			{children}
		</RouterLink>
	);
};

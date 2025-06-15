import { ReactNode } from 'react';
import { cn } from '@/styles/utils/cn';
import styles from './container.module.css';

type ContainerProps = {
	children: ReactNode;
	flexCenter?: boolean;
	className?: string;
};

export const Container = ({ children, flexCenter, className }: ContainerProps) => {
	return (
		<div className={cn(styles.container, flexCenter && styles.flexCenter, className)}>
			{children}
		</div>
	);
};

import { cn } from '@/styles/utils';
import styles from './dimmer.module.css';

type DimmerProps = {
	active: boolean;
	className?: string;
};

export const Dimmer = ({ active, className }: DimmerProps) => {
	return (
		<div
			className={cn(styles.dimmer, className)}
			style={{ opacity: active ? 0.2 : 0 }}
		/>
	);
};

import { cn } from '@/styles/utils';
import styles from './skeleton.module.css';

type SkeletonProps = {
	className?: string;
	width?: string;
	height?: string;
	variant?: 'text' | 'circular' | 'rectangular';
};

export const Skeleton = ({
	className,
	width,
	height,
	variant = 'rectangular',
}: SkeletonProps) => {
	return (
		<div
			className={cn(styles.skeleton, styles[variant], className)}
			style={{ width, height }}
		/>
	);
};

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
	<div className={styles.textContainer}>
		{Array.from({ length: lines }).map((_, i) => (
			<Skeleton
				key={i}
				variant="text"
				width={i === lines - 1 ? '60%' : '100%'}
				className={styles.textLine}
			/>
		))}
	</div>
);

export const SkeletonCard = () => (
	<div className={styles.card}>
		<Skeleton variant="rectangular" height="200px" className={styles.cardImage} />
		<div className={styles.cardContent}>
			<Skeleton variant="text" height="24px" className={styles.cardTitle} />
			<SkeletonText lines={2} />
		</div>
	</div>
);

import { cn } from '@/styles/utils';
import styles from './skeleton.module.css';

type SkeletonProps = {
	className?: string;
	width?: string;
	height?: string;
	variant?: 'text' | 'circular' | 'rectangular';
	noAnimation?: boolean;
};

export const Skeleton = ({
	className,
	width,
	height,
	variant = 'rectangular',
	noAnimation = false,
}: SkeletonProps) => {
	return (
		<div
			className={cn(
				styles.skeleton, 
				styles[variant], 
				noAnimation && styles.noAnimation,
				className
			)}
			style={{ width, height }}
		/>
	);
};

export const SkeletonText = ({ lines = 3, noAnimation = false }: { lines?: number; noAnimation?: boolean }) => (
	<div className={styles.textContainer}>
		{Array.from({ length: lines }).map((_, i) => (
			<Skeleton
				key={i}
				variant="text"
				width={i === lines - 1 ? '60%' : '100%'}
				className={styles.textLine}
				noAnimation={noAnimation}
			/>
		))}
	</div>
);

export const SkeletonCard = ({ noAnimation = false }: { noAnimation?: boolean }) => (
	<div className={styles.card}>
		<Skeleton variant="rectangular" height="200px" className={styles.cardImage} noAnimation={noAnimation} />
		<div className={styles.cardContent}>
			<Skeleton variant="text" height="24px" className={styles.cardTitle} noAnimation={noAnimation} />
			<SkeletonText lines={2} noAnimation={noAnimation} />
		</div>
	</div>
);

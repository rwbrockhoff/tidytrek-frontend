import styles from './segment.module.css';
import { cn } from '@/styles/utils';

const radiusChart = {
	none: 'none',
	'1': 'var(--space-min)',
	'2': 'var(--space-md)',
	'50%': '50%',
} as const;

interface SegmentProps extends React.HTMLAttributes<HTMLDivElement> {
	radius?: keyof typeof radiusChart;
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

export const Segment = ({
	radius,
	className,
	children,
	style,
	...domProps
}: SegmentProps) => {
	return (
		<div
			className={cn(styles.segment, className)}
			style={{
				borderRadius: radiusChart[radius || 'none'],
				...style,
			}}
			{...domProps}>
			{children}
		</div>
	);
};

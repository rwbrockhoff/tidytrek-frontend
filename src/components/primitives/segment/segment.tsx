import { Flex } from '@radix-ui/themes';
import styles from './segment.module.css';
import { cn } from '@/styles/utils';

const radiusChart = {
	none: 'none',
	'1': 'var(--space-min)',
	'2': 'var(--space-md)',
	'50%': '50%',
} as const;

interface SegmentProps extends React.HTMLAttributes<HTMLDivElement> {
	stacked?: boolean;
	radius?: keyof typeof radiusChart;
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

export const Segment = ({
	stacked,
	radius,
	className,
	children,
	style,
	...domProps
}: SegmentProps) => {
	// stacked and radius are already destructured above, domProps contains remaining HTML attributes

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

export const SegmentGroup = ({
	children,
	className,
	...props
}: React.ComponentProps<typeof Flex>) => (
	<Flex className={className} {...props}>
		{children}
	</Flex>
);

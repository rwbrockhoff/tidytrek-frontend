import { Flex } from '@radix-ui/themes';
import styles from './segment.module.css';

type Radius = 'none' | '1' | '2' | '50%';

const radiusChart = {
	none: 'none',
	'1': '.25rem',
	'2': '1rem',
	'50%': '50%',
};

interface SegmentProps {
	stacked?: boolean;
	radius?: Radius;
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
	...props
}: SegmentProps) => {
	const { $stacked, $radius, ...domProps } = props as any;

	return (
		<div
			className={`${styles.segment} ${className || ''}`}
			style={
				{
					'--segment-radius': radiusChart[radius || 'none'],
					...style,
				} as React.CSSProperties
			}
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

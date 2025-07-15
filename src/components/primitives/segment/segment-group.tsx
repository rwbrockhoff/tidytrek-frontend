import { Flex, Stack } from '@/components/layout';

interface SegmentGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	stacked?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export const SegmentGroup = ({
	stacked = true, // Default to stacked (vertical) layout
	className,
	children,
	...props
}: SegmentGroupProps) => {
	if (stacked) {
		return (
			<Stack className={className} {...props}>
				{children}
			</Stack>
		);
	}

	return (
		<Flex className={className} {...props}>
			{children}
		</Flex>
	);
};
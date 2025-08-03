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
	...domProps
}: SegmentGroupProps) => {
	if (stacked) {
		return (
			<Stack className={className} {...domProps}>
				{children}
			</Stack>
		);
	}

	return (
		<Flex className={className} {...domProps}>
			{children}
		</Flex>
	);
};

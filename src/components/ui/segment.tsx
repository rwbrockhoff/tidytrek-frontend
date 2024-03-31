import { Flex } from '@radix-ui/themes';
import styled from 'styled-components';

type Radius = 'none' | '1' | '2' | '100%';

const radiusChart = {
	none: 'none',
	'1': '.25rem',
	'2': '1rem',
	'100%': '100%',
};

export const Segment = styled.div<{ $stacked?: boolean; $radius?: Radius }>`
	background-color: white;
	border: 1px solid var(--gray-4);
	padding: 2em;
	box-shadow: 0px 8px 0px -6px rgba(0, 0, 0, 0.1);
	border-radius: ${({ $radius }) => radiusChart[$radius || 'none']};
`;

export const SegmentGroup = styled(Flex)``;

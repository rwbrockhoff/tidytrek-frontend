import { Flex } from '@radix-ui/themes';
import styled from 'styled-components';

export const Segment = styled.div<{ $stacked?: boolean }>`
	background-color: white;
	border: 1px solid var(--gray-4);
	padding: 3em 2em;
	box-shadow: 0px 8px 0px -6px rgba(0, 0, 0, 0.1);
`;

export const SegmentGroup = styled(Flex)``;

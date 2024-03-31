import { Flex, HoverCard, Text } from '@radix-ui/themes';
import { InfoIcon, TreeIcon } from './icons';
import styled from 'styled-components';

export const Tooltip = ({ content }: { content: string }) => {
	return (
		<HoverCard.Root>
			<HoverCard.Trigger>
				<StyledSpan>
					<InfoIcon />
				</StyledSpan>
			</HoverCard.Trigger>
			<HoverCard.Content style={{ maxWidth: 300 }} side="top">
				<Flex align="center">
					<TreeIcon size={40} />
					<Text ml="4">{content}</Text>
				</Flex>
			</HoverCard.Content>
		</HoverCard.Root>
	);
};

const StyledSpan = styled.span`
	height: 50%;
	svg {
		color: var(--gray-8);
		margin-left: 0.5em;
	}
`;

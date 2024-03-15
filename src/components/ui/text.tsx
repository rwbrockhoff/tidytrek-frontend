import { Text as RadixText, Flex } from '@radix-ui/themes';
import styled from 'styled-components';

type TextProps = {
	children: React.ReactNode;
	icon?: React.ReactNode;
};

export const Text = (props: TextProps) => {
	const { children, icon } = props;
	return (
		<RadixText mr="4">
			<Flex align="center">
				<IconContainer align="center">{icon}</IconContainer>
				{children}
			</Flex>
		</RadixText>
	);
};

const IconContainer = styled(Flex)`
	margin-right: 0.5em;
`;

import styled from 'styled-components';
import { Separator, Flex, Text } from '@radix-ui/themes';
import { frontendURL } from '@/api/tidytrekAPI';
import { HikingIcon } from '@/components/ui';

type DashboardFooterProps = {
	affiliate: boolean;
	description: string;
};

export const DashboardFooter = ({ affiliate, description }: DashboardFooterProps) => {
	return (
		<Footer>
			{affiliate && (
				<Flex align="center" direction="column">
					<Text align="center" weight="light" color="gray" size="2">
						{description ||
							`Using the affiliate links in this pack helps support the creator of this pack
						at no extra cost to you!`}
					</Text>
					<Separator color="gray" size="3" mt="4" />
				</Flex>
			)}
			<a href={`${frontendURL}`}>
				<LogoTag justify="center">
					<Text size="2">
						tidytrek
						<HikingIcon /> Made in Colorado
					</Text>
				</LogoTag>
			</a>
		</Footer>
	);
};

const Footer = styled.footer`
	padding: 1em 0vh;
`;

const LogoTag = styled(Flex)`
	margin-top: 1em;
	color: var(--gray-9);
	font-weight: 500;
	&:hover {
		filter: var(--hover-dark);
	}
	svg {
		margin: 0 0.5em;
	}
`;

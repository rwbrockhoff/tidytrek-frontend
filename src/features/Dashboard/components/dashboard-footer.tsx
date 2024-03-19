import styled from 'styled-components';
import { Separator, Flex } from '@radix-ui/themes';
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
					<AffiliateText>
						{description ||
							`Using the affiliate links in this pack helps support the creator of this pack
						at no extra cost to you!`}
					</AffiliateText>
					<Separator color="gray" size="3" />
				</Flex>
			)}
			<a href={`${frontendURL}`}>
				<LogoTag>
					<p>
						tidytrek
						<HikingIcon /> Made in Colorado
					</p>
				</LogoTag>
			</a>
		</Footer>
	);
};

const Footer = styled.footer`
	margin-top: 2vh;
	padding: 1vh 0vh;
	a {
		color: black;
	}
`;

const LogoTag = styled.div`
	display: flex;
	justify-content: center;
	opacity: 0.5;
	margin-top: 2vh;

	.logo-text {
		font-weight: 900;
	}
	i {
		margin: 0px 15px;
	}
	&:hover {
		opacity: 0.8;
	}
`;

const AffiliateText = styled.p`
	font-style: italic;
	opacity: 0.8;
	text-align: center;
`;

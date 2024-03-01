import styled from 'styled-components';
import { Divider } from 'semantic-ui-react';

type DashboardFooterProps = {
	affiliate: boolean;
	description: string;
};

const DashboardFooter = ({ affiliate, description }: DashboardFooterProps) => {
	return (
		<Footer>
			{affiliate && (
				<>
					<AffiliateText>
						{description ||
							`Using the affiliate links in this pack helps support the creator of this pack
						at no extra cost to you!`}
					</AffiliateText>
					<Divider />
				</>
			)}
			<a href="https://tidytrek.co">
				<LogoTag>
					<p>
						tidytrek
						<i className="fa-solid fa-person-hiking" /> Made in Colorado
					</p>
				</LogoTag>
			</a>
		</Footer>
	);
};

export default DashboardFooter;

const Footer = styled.footer`
	margin-top: 2vh;
	padding: 1vh 0vh;
	.divider {
		opacity: 0.5;
	}
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

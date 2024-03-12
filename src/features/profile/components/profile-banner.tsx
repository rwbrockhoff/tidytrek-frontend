import styled from 'styled-components';
import { Button } from '@/components/ui/SemanticUI';
import { Header } from 'semantic-ui-react';
import { Link } from '@/components/ui/Link';

export const ProfileBanner = () => {
	return (
		<BannerContainer>
			<Link link="/">
				<StyledHeader as="h2">tidytrek</StyledHeader>
			</Link>
			<RightPanel>
				<Link link={'/register'}>
					<StyledButton>Sign Up</StyledButton>
				</Link>
			</RightPanel>
		</BannerContainer>
	);
};

const BannerContainer = styled.div`
	height: 5vh;
	width: 100%;
	margin-bottom: 2vh;
	display: flex;
	align-items: center;
`;

const StyledButton = styled(Button)`
	&&& {
		${({ theme: t }) => t.mx.themeBgColor('tidyPrimary', 'tidy')}
		color: white;
	}
`;

const RightPanel = styled.div`
	margin-left: auto;
	margin-right: 2vw;
`;

const StyledHeader = styled(Header)`
	margin: 0;
	margin-left: 2vw;
	${({ theme: t }) => t.mx.themeColor('tidyPrimary', 'tidy')}
`;

import styled from 'styled-components';
import { Button } from '../../../shared/ui/SemanticUI';
import { Header } from 'semantic-ui-react';
import { CustomLink } from '../../../shared/ui/CustomLinks';

const ProfileBanner = () => {
	return (
		<BannerContainer>
			<CustomLink link="/">
				<StyledHeader as="h2">tidytrek</StyledHeader>
			</CustomLink>
			<StyledButton>
				<CustomLink link={'/register'}>Sign Up</CustomLink>
			</StyledButton>
		</BannerContainer>
	);
};

export default ProfileBanner;

const BannerContainer = styled.div`
	height: 5vh;
	width: 80vw;
	margin-bottom: 2vh;
	display: flex;
	align-items: center;
`;

const StyledButton = styled(Button)`
	&&& {
		background-color: #338866;
		color: white;
		margin-left: auto;
		margin-right: 50px;
	}
`;

const StyledHeader = styled(Header)`
	margin: 0;
	margin-left: 50px;
`;

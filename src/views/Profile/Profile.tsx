import styled, { ThemeProvider } from 'styled-components';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import ProfileBanner from '../../components/Profile/ProfileBanner/ProfileBanner';
import PackCardList from '../../components/Profile/PackCard/PackCardList';
import { useGetProfileQuery } from '../../queries/profileQueries';
import { UserViewContext } from '../Dashboard/hooks/useViewerContext';
import { useViewProfileQuery } from '../../queries/guestQueries';
import { useGetAuthStatusQuery } from '../../queries/userQueries';
import { HandlerWrapper } from '../Account/ProfileSettings/useProfileHandlers';
import { getTheme } from '../../shared/theme/themeUtils';

const Profile = ({ userView }: { userView: boolean }) => {
	const { userId: paramUserId } = useParams();
	const { data: authData } = useGetAuthStatusQuery();
	const { data } = userView ? useGetProfileQuery() : useViewProfileQuery(paramUserId);

	const isGuest = !authData?.isAuthenticated;
	const theme = getTheme(data?.settings);

	const userProfile = data?.userProfile;
	const packThumbnailList = data?.packThumbnailList;

	return (
		<UserViewContext.Provider value={userView}>
			<ThemeProvider theme={theme}>
				<HandlerWrapper>
					<ProfileContainer>
						{isGuest && <ProfileBanner />}
						<ProfileHeader userProfile={userProfile} />
						<PackCardList packThumbnailList={packThumbnailList} />
					</ProfileContainer>
				</HandlerWrapper>
			</ThemeProvider>
		</UserViewContext.Provider>
	);
};

export default Profile;

const ProfileContainer = styled.div`
	position: relative;
`;

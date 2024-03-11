import styled, { ThemeProvider } from 'styled-components';
import { useParams } from 'react-router-dom';
import { ProfileBanner, ProfileHeader, PackCardList } from '@/features/profile';
import { useGetProfileQuery } from '../queries/profileQueries';
import { UserViewContext } from '../features/Dashboard/hooks/useViewerContext';
import { useViewProfileQuery } from '../queries/guestQueries';
import { useGetAuthStatusQuery } from '../queries/userQueries';
import { HandlerWrapper } from './Account/ProfileSettings/useProfileHandlers';
import { getTheme } from '../styles/theme/theme-utils';

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

const ProfileContainer = styled.main`
	position: relative;
`;

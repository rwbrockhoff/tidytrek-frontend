import styled, { ThemeProvider } from 'styled-components';
import { useParams } from 'react-router-dom';
import { ProfileBanner } from '../components/profile-banner';
import { ProfileHeader } from '../components/profile-header';
import { PackCardList } from '../components/pack-card-list';
import { useGetProfileQuery } from '@/queries/profileQueries';
import { UserViewContext } from '@/hooks/use-viewer-context';
import { useViewProfileQuery } from '@/queries/guestQueries';
import { useGetAuthStatusQuery } from '@/queries/userQueries';
import { HandlerWrapper } from '../../account/hooks/use-profile-handlers';
import { getTheme } from '@/styles/theme/theme-utils';

export const Profile = ({ userView }: { userView: boolean }) => {
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

const ProfileContainer = styled.main`
	position: relative;
`;

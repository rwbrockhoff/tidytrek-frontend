import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import ProfileBanner from '../../components/Profile/ProfileBanner/ProfileBanner';
import PackCardList from '../../components/Profile/PackCard/PackCardList';
import { useGetProfileQuery } from '../../queries/profileQueries';
import { UserViewContext } from '../Dashboard/hooks/useUserContext';
import { useViewProfileQuery } from '../../queries/guestQueries';

const Profile = ({ userView }: { userView: boolean }) => {
	const { userId: paramUserId } = useParams();

	const { data } = userView ? useGetProfileQuery() : useViewProfileQuery(paramUserId);

	const userProfile = data?.userProfile;
	const packThumbnailList = data?.packThumbnailList;

	return (
		<UserViewContext.Provider value={userView}>
			<ProfileContainer>
				<ProfileBanner />
				<ProfileHeader userProfile={userProfile} />
				<PackCardList packThumbnailList={packThumbnailList} />
			</ProfileContainer>
		</UserViewContext.Provider>
	);
};

export default Profile;

const ProfileContainer = styled.div`
	position: relative;
`;

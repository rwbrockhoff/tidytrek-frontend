import styled from 'styled-components';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import { useGetProfileQuery } from '../../queries/profileQueries';
import PackCardList from '../../components/Profile/PackCard/PackCardList';
import { UserViewContext } from '../Dashboard/hooks/useUserContext';
import { useParams } from 'react-router-dom';
import { useViewProfileQuery } from '../../queries/guestQueries';

const Profile = ({ userView }: { userView: boolean }) => {
	const { userId: paramUserId } = useParams();

	const { data } = userView ? useGetProfileQuery() : useViewProfileQuery(paramUserId);

	const userProfile = data?.userProfile;
	const packThumbnailList = data?.packThumbnailList;

	return (
		<UserViewContext.Provider value={userView}>
			<ProfileContainer>
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

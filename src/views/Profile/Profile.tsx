import styled from 'styled-components';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import { useGetProfileQuery } from '../../queries/profileQueries';
import PackCardList from '../../components/Profile/PackCard/PackCardList';

const Profile = () => {
	const { data } = useGetProfileQuery();
	const userProfile = data?.userProfile;
	const packThumbnailList = data?.packThumbnailList;

	return (
		<ProfileContainer>
			<ProfileHeader userProfile={userProfile} />
			<PackCardList packThumbnailList={packThumbnailList} />
		</ProfileContainer>
	);
};

export default Profile;

const ProfileContainer = styled.div`
	position: relative;
`;

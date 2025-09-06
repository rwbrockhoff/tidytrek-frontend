import { useParams } from 'react-router-dom';
import { ProfileHeader } from '../components/profile-header/profile-header';
import { PackCardList } from '../components/pack-card-list/pack-card-list';
import { useGetProfileQuery } from '@/queries/profile-queries';
import { UserPermissionsProvider } from '@/contexts/user-permissions-context';
import { useUserPermissions } from '@/hooks/auth/use-user-permissions';
import { useLayoutLoading } from '@/hooks/ui/use-layout-loading';
import { useViewProfileQuery } from '@/queries/guest-queries';
import { useGuestProfileData } from '@/hooks/profile/use-guest-profile-data';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';

export const Profile = ({ isCreator }: { isCreator: boolean }) => {
	const { userId: paramUserId } = useParams();
	const userProfileQuery = useGetProfileQuery();
	const guestProfileQuery = useViewProfileQuery(isCreator ? undefined : paramUserId);

	const data = isCreator ? userProfileQuery.data : guestProfileQuery.data;
	const isPending = isCreator ? userProfileQuery.isPending : guestProfileQuery.isPending;

	useLayoutLoading(isPending);

	const userProfile = data?.userProfile ?? null;
	const packThumbnailList = data?.packThumbnailList ?? [];

	// Get guest profile properties
	const { notFound, isPrivate, isFollowing, showSkeletonCards } =
		useGuestProfileData(data);

	const permissions = useUserPermissions();

	return (
		<UserPermissionsProvider value={permissions}>
			<PageLayout>
				<ProfileHeader
					userProfile={userProfile}
					userId={paramUserId}
					notFound={notFound}
					isPrivate={isPrivate}
					hasError={data?.hasError}
					isFollowing={isFollowing}
				/>
				<PackCardList
					packThumbnailList={packThumbnailList}
					showSkeletonCards={showSkeletonCards}
				/>
			</PageLayout>
		</UserPermissionsProvider>
	);
};

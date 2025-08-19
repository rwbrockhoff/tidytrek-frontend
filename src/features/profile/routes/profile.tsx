import { useParams } from 'react-router-dom';
import { ProfileHeader } from '../components/profile-header/profile-header';
import { PackCardList } from '../components/pack-card-list/pack-card-list';
import { useGetProfileQuery } from '@/queries/profile-queries';
import { UserPermissionsProvider } from '@/contexts/user-permissions-context';
import { useUserPermissions } from '@/hooks/auth/use-user-permissions';
import { useLayoutLoading } from '@/hooks/ui/use-layout-loading';
import { useViewProfileQuery, isGuestProfileData } from '@/queries/guest-queries';
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

	// Type-safe access to guest properties
	const notFound = isGuestProfileData(data) ? data.notFound ?? false : false;
	const isPrivate = isGuestProfileData(data) ? data.isPrivate ?? false : false;
	const showSkeletonCards = notFound || isPrivate;

	const permissions = useUserPermissions();

	return (
		<UserPermissionsProvider value={permissions}>
			<PageLayout>
				<ProfileHeader
					userProfile={userProfile}
					notFound={notFound}
					isPrivate={isPrivate}
					hasError={data?.hasError}
				/>
				<PackCardList
					packThumbnailList={packThumbnailList}
					showSkeletonCards={showSkeletonCards}
				/>
			</PageLayout>
		</UserPermissionsProvider>
	);
};

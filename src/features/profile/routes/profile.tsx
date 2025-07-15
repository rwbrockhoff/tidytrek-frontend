import { useParams } from 'react-router-dom';
import { ProfileBanner } from '@/features/auth/components/profile-banner';
import { ProfileHeader } from '../components/profile-header/profile-header';
import { PackCardList } from '../components/pack-card-list/pack-card-list';
import { useGetProfileQuery } from '@/queries/profile-queries';
import { UserViewContext } from '@/contexts/user-view-context';
import { useViewProfileQuery, isGuestProfileData } from '@/queries/guest-queries';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';

export const Profile = ({ userView }: { userView: boolean }) => {
	const { userId: paramUserId } = useParams();
	const { isAuthenticated } = useGetAuth();
	const showPromotion = !isAuthenticated;

	const { data } = userView ? useGetProfileQuery() : useViewProfileQuery(paramUserId);

	const userProfile = data?.userProfile ?? null;
	const packThumbnailList = data?.packThumbnailList ?? [];

	// Type-safe access to guest properties
	const notFound = isGuestProfileData(data) ? data.notFound ?? false : false;
	const isPrivate = isGuestProfileData(data) ? data.isPrivate ?? false : false;
	const showSkeletonCards = notFound || isPrivate;
	return (
		<UserViewContext.Provider value={userView}>
			<PageLayout>
				{showPromotion && <ProfileBanner />}
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
		</UserViewContext.Provider>
	);
};

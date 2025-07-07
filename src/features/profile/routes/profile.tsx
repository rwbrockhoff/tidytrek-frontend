import { useParams } from 'react-router-dom';
import { ProfileBanner } from '@/components';
import { ProfileHeader } from '../components/profile-header';
import { PackCardList } from '../components/pack-card-list';
import { useGetProfileQuery } from '@/queries/profile-queries';
import { UserViewContext } from '@/hooks/use-viewer-context';
import { useViewProfileQuery, isGuestProfileData } from '@/queries/guest-queries';
import { useGetAuth } from '@/hooks';
import { cn } from '@/styles/utils';

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
			<main className={cn(userView && 'page-layout')}>
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
			</main>
		</UserViewContext.Provider>
	);
};

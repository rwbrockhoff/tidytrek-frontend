import { PackInfo } from '../pack-info/pack-info';
import { ResponsivePackCategory } from '../pack-category/responsive-pack-category';
import { AddCategoryButton } from '../table';
import { Flex, Stack } from '@/components/layout';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { PricingContext } from '@/contexts/pricing-context';
import {
	PackQueryState as UserState,
	type Category,
	PackListItem,
} from '@/types/pack-types';
import { GuestQueryState as GuestState } from '@/queries/guest-queries';
import { DashboardFooter } from './dashboard-footer';
import { DragDropContext, Drop, type DropResult } from '@/components';
import { GuestPreviewBanner } from '../guest-preview-banner';
import { ProfileBanner } from '@/features/auth/components/profile-banner';
import { useGuestData } from '../../hooks/use-guest-data';
import { usePackDragHandler } from '../../hooks/use-pack-drag-handler';
import { useAddPackCategoryMutation } from '@/queries/pack-queries';
import { getNextCategoryColor } from '../../utils/get-next-category-color';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';

type DashboardProps = {
	isAuthenticated: boolean;
	isPending: boolean;
	paramPackId: string | undefined;
	currentPack: UserState | GuestState | undefined;
	packList: PackListItem[] | [];
};

export const DashboardContainer = (props: DashboardProps) => {
	const userView = useUserContext();
	const { user } = useGetAuth();
	const { isAuthenticated, isPending, paramPackId, currentPack, packList } = props;
	const { pack, categories } = currentPack || {};
	const packCategories = categories || [];
	const packId = pack?.packId || null;

	// Check if current user owns this pack
	const isUsersPack = user && pack ? user.userId === pack.userId : false;

	const { onDragEnd } = usePackDragHandler();
	const { mutate: addPackCategory } = useAddPackCategoryMutation();

	//--Guest View Data--//
	const { userProfile, settings } = useGuestData(currentPack);
	//--Guest View Data--//

	const handleOnDragEnd = (result: DropResult) => {
		if (pack) {
			// Attach categories to pack object for drag handler
			const packWithCategories = { ...pack, categories: packCategories };
			onDragEnd(result, packWithCategories, paramPackId);
		}
	};

	const handleAddCategory = () => {
		if (packId) {
			const categoryColor = getNextCategoryColor(packCategories);
			addPackCategory({ packId, categoryColor });
		}
	};

	const {
		packAffiliate = false,
		packAffiliateDescription = '',
		packPricing = false,
	} = pack || {};

	if (!pack) return;

	const showPromotion = !isAuthenticated;
	const showPreviewMode = !userView && isUsersPack;
	return (
		<PricingContext.Provider value={packPricing}>
			<PageLayout>
				{/* Show promotional banner for non-authenticated visitors */}
				{showPromotion && <ProfileBanner />}

				{/* Show preview banner if user is viewing their own pack in guest mode */}
				{showPreviewMode && <GuestPreviewBanner />}

				<PackInfo
					currentPack={pack}
					packCategories={packCategories}
					userProfile={userProfile}
					settings={settings}
					fetching={isPending}
				/>

				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Drop droppableId={'dashboard-drop-window'} type="category">
						<Stack className="gap-12">
							{packCategories.length > 0 &&
								packCategories.map((category: Category, index: number) => {
									return (
										<ResponsivePackCategory
											category={category}
											packList={packList}
											index={index}
											key={category.packCategoryId}
										/>
									);
								})}
						</Stack>
					</Drop>
				</DragDropContext>

				{userView && (
					<Flex className="justify-center w-full mt-12">
						<AddCategoryButton onClick={handleAddCategory} />
					</Flex>
				)}

				{/* promotional footer for non-authenticated visitors */}
				{showPromotion && (
					<DashboardFooter
						affiliate={packAffiliate}
						description={packAffiliateDescription}
					/>
				)}
			</PageLayout>
		</PricingContext.Provider>
	);
};

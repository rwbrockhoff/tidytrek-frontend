import { PackInfo } from './pack-info/pack-info';
import { ResponsivePackCategory } from './responsive-pack-category';
import { AddCategoryButton } from '@/components/table';
import { Flex } from '@radix-ui/themes';
import { PricingContext, useUserContext } from '@/hooks/use-viewer-context';
import {
	InitialState as UserState,
	type Category,
	PackListItem,
} from '@/types/pack-types';
import { InitialState as GuestState } from '@/queries/guest-queries';
import { DashboardFooter } from './dashboard-footer';
import {
	DragDropContext,
	Drop,
	GuestPreviewBanner,
	ProfileBanner,
	type DropResult,
} from '@/components';
import { useGuestData } from '../hooks/use-guest-data';
import { usePackCategoryActions } from '../hooks/use-pack-category-actions';
import { useGetAuth } from '@/hooks';
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

	const { onDragEnd, addPackCategory } = usePackCategoryActions();

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
					</Drop>
				</DragDropContext>

				{userView && (
					<Flex justify="center" width="100%">
						<AddCategoryButton
							onClick={() => packId && addPackCategory(packId, packCategories)}
						/>
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

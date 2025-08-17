import { PackInfo } from '../pack-info/pack-info';
import { ResponsivePackCategory } from '../pack-category/responsive-pack-category';
import { AddCategoryButton } from '../table';
import { Flex, Stack } from '@/components/layout';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { PackPricingContext } from '@/contexts/pack-pricing-context';
import {
	PackQueryState as UserState,
	type Category,
	PackListItem,
} from '@/types/pack-types';
import { GuestQueryState as GuestState } from '@/queries/guest-queries';
import { DashboardFooter } from './dashboard-footer';
import { DragDropWrapper } from '@/components/drag-drop/drag-drop-wrapper';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { GuestPreviewBanner } from '../guest-preview-banner';
import { useGuestData } from '../../hooks/use-guest-data';
import { useAddPackCategoryMutation } from '@/queries/pack-queries';
import { getNextCategoryColor } from '../../utils/get-next-category-color';
import { useDashboardDragHandlers } from '../../hooks/use-dashboard-drag-handlers';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';
import { PackNotAvailable } from '../pack-not-available/pack-not-available';
import { DashboardDragOverlay } from '../dashboard-drag-overlay/dashboard-drag-overlay';

type DashboardProps = {
	isPending: boolean;
	paramPackId: string | undefined;
	currentPack: UserState | GuestState | undefined;
	packList: PackListItem[] | [];
};

export const DashboardContainer = (props: DashboardProps) => {
	const { isPending, paramPackId, currentPack, packList } = props;
	const { pack, categories } = currentPack || {};
	const packCategories = useMemo(() => categories || [], [categories]);
	const packId = pack?.packId || null;
	const location = useLocation();

	const { isAuthenticated, isCreator } = useUserPermissionsContext();
	const { mutate: addPackCategory } = useAddPackCategoryMutation();
	const { localPackCategories, handleOnDragStart, handleOnDragOver, handleOnDragEnd } =
		useDashboardDragHandlers(packCategories, pack, paramPackId);

	const { userProfile, settings } = useGuestData(currentPack);

	const handleAddCategory = () => {
		if (packId) {
			const categoryColor = getNextCategoryColor(localPackCategories);
			addPackCategory({ packId, categoryColor });
		}
	};

	const renderDragOverlay = (activeId: string | null) => (
		<DashboardDragOverlay
			activeId={activeId}
			localPackCategories={localPackCategories}
			packList={packList}
		/>
	);

	const {
		packAffiliate = false,
		packAffiliateDescription = '',
		packPricing = false,
	} = pack || {};

	if (!isPending && !pack) {
		return <PackNotAvailable />;
	}

	if (!pack) return null;

	const isGuestRoute = location.pathname.startsWith('/pk/');
	const showPreviewMode = isAuthenticated && isCreator && isGuestRoute;

	return (
		<PackPricingContext.Provider value={packPricing}>
			<PageLayout>
				{/* Show preview banner if user is viewing their own pack in guest mode */}
				{showPreviewMode && <GuestPreviewBanner />}

				<PackInfo
					currentPack={pack}
					packCategories={localPackCategories}
					userProfile={userProfile}
					settings={settings}
					fetching={isPending}
				/>

				<DragDropWrapper
					onDragStart={handleOnDragStart}
					onDragOver={handleOnDragOver}
					onDragEnd={handleOnDragEnd}
					renderDragOverlay={renderDragOverlay}>
					<SortableContext
						items={localPackCategories.map((cat) => cat.packCategoryId.toString())}
						strategy={verticalListSortingStrategy}>
						<Stack className="gap-12">
							{localPackCategories.length > 0 &&
								localPackCategories.map((category: Category) => {
									return (
										<ResponsivePackCategory
											category={category}
											packList={packList}
											key={category.packCategoryId}
										/>
									);
								})}
						</Stack>
					</SortableContext>
				</DragDropWrapper>

				{isCreator && (
					<Flex className="justify-center w-full mt-12">
						<AddCategoryButton onClick={handleAddCategory} />
					</Flex>
				)}

				{/* optional affiliate message footer for non-auth visitors */}
				{isGuestRoute && (
					<DashboardFooter
						affiliate={packAffiliate}
						description={packAffiliateDescription}
					/>
				)}
			</PageLayout>
		</PackPricingContext.Provider>
	);
};

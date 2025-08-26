import { PackInfo } from '../pack-info/pack-info';
import { ResponsivePackCategory } from '../pack-category/responsive-pack-category';
import { AddCategoryButton } from '../table';
import { Flex, Stack } from '@/components/layout';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { PackPricingContext } from '@/contexts/pack-pricing-context';
import { DashboardViewProvider } from '../../contexts/dashboard-view-context';
import {
	PackQueryState as UserState,
	type Category,
	PackListItem,
} from '@/types/pack-types';
import { GuestQueryState as GuestState } from '@/queries/guest-queries';
import { DragDropWrapper } from '@/components/drag-drop/drag-drop-wrapper';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { useGuestRoute } from '@/hooks/routing/use-route-context';
import { GuestPreviewBanner } from '../guest-preview-banner';
import { useGuestData } from '../../hooks/use-guest-data';
import { useAddPackCategoryMutation } from '@/queries/pack-queries';
import { getNextCategoryColor } from '../../utils/get-next-category-color';
import { useDashboardDragHandlers } from '../../drag-and-drop';
import { usePackDetails } from '@/hooks/pack/use-pack-details';
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
	const isGuestRoute = useGuestRoute();

	const { isAuthenticated, isCreator } = usePermissions();
	const { mutate: addPackCategory } = useAddPackCategoryMutation();
	const { localPackCategories, handleOnDragStart, handleOnDragOver, handleOnDragEnd } =
		useDashboardDragHandlers(packCategories, pack, paramPackId);

	const { userProfile, settings } = useGuestData(currentPack);
	const { palette: packPalette } = usePackDetails();

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

	if (!isPending && !pack) {
		return <PackNotAvailable />;
	}

	if (!pack) return null;

	const { packPricing = false } = pack;

	const showPreviewMode = isAuthenticated && isCreator && isGuestRoute;
	const canEdit = isCreator && !showPreviewMode;

	return (
		<PackPricingContext.Provider value={packPricing}>
			<DashboardViewProvider canEdit={canEdit} isPreviewMode={showPreviewMode}>
				<div data-theme-palette={packPalette}>
					<PageLayout>
						{showPreviewMode && <GuestPreviewBanner />}

						<PackInfo
							currentPack={pack}
							packCategories={packCategories}
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
								items={localPackCategories.map((cat: Category) => cat?.packCategoryId?.toString() ?? '')}
								strategy={verticalListSortingStrategy}>
								<Stack className="gap-12">
									{localPackCategories.length > 0 &&
										localPackCategories.map((category: Category, index) => {
											return (
												<ResponsivePackCategory
													category={category}
													packList={packList}
													key={category?.packCategoryId ?? `category-${index}`}
												/>
											);
										})}
								</Stack>
							</SortableContext>
						</DragDropWrapper>

						{canEdit && (
							<Flex className="justify-center w-full mt-12">
								<AddCategoryButton onClick={handleAddCategory} />
							</Flex>
						)}
					</PageLayout>
				</div>
			</DashboardViewProvider>
		</PackPricingContext.Provider>
	);
};

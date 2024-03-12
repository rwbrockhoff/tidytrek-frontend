import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { PackInfo } from './pack-info/pack-info';
import { PackCategory } from './pack-category';
import { AddCategoryButton } from '@/components/table';
import { PricingContext, useUserContext } from '@/hooks/use-viewer-context';
import {
	InitialState as UserState,
	type Category,
	PackListItem,
} from '@/types/pack-types';
import { InitialState as GuestState } from '@/queries/guestQueries';
import { DashboardFooter } from './dashboard-footer';
import {
	DragDropContext,
	Drop,
	type DropResult,
} from '@/components/drag-drop/drag-drop-wrapper';
import { DeleteModal } from '@/components/ui';
import { useGuestData } from '../hooks/use-guest-data';
import { getThemeAsGuest } from '@/styles/theme/theme-utils';
import { usePackCategoryHandlers } from '../handlers/use-pack-category-handlers';

type DashboardProps = {
	isAuthenticated: boolean;
	isPending: boolean;
	paramPackId: string | undefined;
	currentPack: UserState | GuestState | undefined;
	packList: PackListItem[] | [];
};

export const DashboardContainer = (props: DashboardProps) => {
	const userView = useUserContext();
	const { isAuthenticated, isPending, paramPackId, currentPack, packList } = props;
	const { pack, categories } = currentPack || {};
	const packCategories = categories || [];
	const packId = pack?.packId || null;

	const { handlers, handlerState } = usePackCategoryHandlers();

	const {
		onDragEnd,
		addCategory,
		deleteCategory,
		deleteCategoryAndItems,
		toggleCategoryModal,
	} = handlers;
	const { showDeleteCategoryModal } = handlerState;

	//--Guest View Data--//
	const { userProfile, settings } = useGuestData(currentPack);
	const theme = getThemeAsGuest(currentPack);
	//--Guest View Data--//

	const handleOnDragEnd = (result: DropResult) => {
		if (pack) onDragEnd(result, pack, paramPackId);
	};

	const {
		packAffiliate = false,
		packAffiliateDescription = '',
		packPricing = false,
	} = pack || {};
	if (!pack) return;
	return (
		<PricingContext.Provider value={packPricing}>
			<ThemeProvider theme={theme}>
				<Container>
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
								packCategories.map((category: Category, idx: number) => {
									return (
										<PackCategory
											category={category}
											packList={packList}
											index={idx}
											key={category.packCategoryId}
										/>
									);
								})}
						</Drop>
					</DragDropContext>

					{userView && (
						<AddCategoryButton onClick={() => packId && addCategory(packId)} />
					)}

					{!userView && !isAuthenticated && (
						<DashboardFooter
							affiliate={packAffiliate}
							description={packAffiliateDescription}
						/>
					)}

					<DeleteModal
						open={showDeleteCategoryModal}
						onClickMove={deleteCategory}
						onClickDelete={deleteCategoryAndItems}
						onClose={toggleCategoryModal}
					/>
				</Container>
			</ThemeProvider>
		</PricingContext.Provider>
	);
};

const Container = styled.main`
	display: flex;
	align-items: center;
	flex-direction: column;

	footer {
		width: 100%;
		margin-top: auto;
	}
`;

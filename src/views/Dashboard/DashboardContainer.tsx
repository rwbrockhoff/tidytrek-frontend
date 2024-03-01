import PackInfo from '../../components/Dashboard/PackInfo/PackInfo';
import PackCategory from '../../components/Dashboard/PackCategory/PackCategory';
import { AddCategoryButton } from '../../components/Dashboard/PackCategory/TableButtons/TableButtons';
import { PricingContext, useUserContext } from './hooks/useViewerContext';
import {
	InitialState as UserState,
	type Category,
	PackListItem,
} from '../../types/packTypes';
import { InitialState as GuestState } from '../../queries/guestQueries';
import DashboardFooter from '../../components/Dashboard/DashboardFooter/DashboardFooter';
import {
	DragDropContext,
	Drop,
	type DropResult,
} from '../../shared/components/DragDropWrapper';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import useGuestData from './hooks/useGuestData';
import { getThemeAsGuest } from '../../shared/theme/themeUtils';
import { usePackCategoryHandlers } from './handlers/usePackCategoryHandlers';
import { DeleteModal } from '../../shared/ui/Modals';

type DashboardContainerProps = {
	isAuthenticated: boolean;
	isPending: boolean;
	paramPackId: string | undefined;
	currentPack: UserState | GuestState | undefined;
	packList: PackListItem[] | [];
};

const DashboardContainer = (props: DashboardContainerProps) => {
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

export default DashboardContainer;

const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

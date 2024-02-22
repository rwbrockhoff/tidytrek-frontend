import PackInfo from '../../components/Dashboard/PackInfo/PackInfo';
import PackCategory from '../../components/Dashboard/PackCategory/PackCategory';
import { AddCategoryButton } from '../../components/Dashboard/PackCategory/TableButtons/TableButtons';
import { useParams } from 'react-router-dom';
import { UserViewContext } from './useUserContext';
import { useGetPackQuery, useGetPackListQuery } from '../../queries/packQueries';
import { useViewPackQuery } from '../../queries/guestQueries';
import { type Category, type Pack } from '../../types/packTypes';
import DashboardFooter from '../../components/Dashboard/DashboardFooter/DashboardFooter';
import { DragDropContext, Drop, type DropResult } from '../../shared/DragDropWrapper';
import { ThemeProvider } from 'styled-components';
import { getThemeAsGuest, isGuestData } from '../Layout/themeUtils';
import styled from 'styled-components';
import { HandlerWrapper as PackItemHandlerWrapper } from './handlers/usePackItemHandlers';
import { HandlerWrapper as PackCategoryHandlerWrapper } from './handlers/usePackCategoryHandlers';
import { usePackItemMutations } from './mutations/usePackItemMutations';
import { usePackCategoryMutations } from './mutations/usePackCategoryMutations';

type DashboardProps = { userView: boolean };

const Dashboard = ({ userView }: DashboardProps) => {
	const { movePackItem } = usePackItemMutations();
	const { addPackCategory, movePackCategory } = usePackCategoryMutations();

	const { packId: paramPackId } = useParams();
	const { data, isPending } = userView
		? useGetPackQuery(paramPackId)
		: useViewPackQuery(paramPackId);

	const theme = getThemeAsGuest(data);

	const { data: packListData } = userView
		? useGetPackListQuery()
		: { data: { packList: [] } };
	const { packList } = packListData || { packList: [] };

	let packCategories = data?.categories || [];
	const currentPack = data?.pack || ({} as Pack);
	const packId = data?.pack.packId || null;
	const profile = isGuestData(data) ? data.profile : null;

	const handleAddPackCategory = () => {
		packId && addPackCategory.mutate(packId);
	};

	const handleOnDragEnd = (result: DropResult) => {
		const { draggableId, destination, source, type } = result;

		if (!destination) return;

		const sameIndex = destination.index === source.index;

		if (type === 'category') {
			if (sameIndex) return;

			movePackCategory.mutate({
				packId: currentPack.packId,
				paramPackId,
				packCategoryId: draggableId,
				prevIndex: source.index,
				newIndex: destination.index,
			});
		} else {
			const sameCategory = destination.droppableId === source.droppableId;
			if (sameIndex && sameCategory) return;

			const dragId = draggableId.replace(/\D/g, '');
			movePackItem.mutate({
				packId: paramPackId ? packId : null,
				packItemId: dragId,
				packCategoryId: destination.droppableId,
				packItemIndex: destination.index,
				prevPackCategoryId: source.droppableId,
				prevPackItemIndex: source.index,
			});
		}
	};

	const { packAffiliate, packAffiliateDescription } = currentPack;

	return (
		<PackCategoryHandlerWrapper>
			<PackItemHandlerWrapper>
				<UserViewContext.Provider value={userView}>
					<ThemeProvider theme={theme}>
						<DashboardContainer>
							<PackInfo
								currentPack={currentPack}
								packCategories={packCategories}
								profile={profile}
								fetching={isPending}
							/>

							<DragDropContext onDragEnd={handleOnDragEnd}>
								<Drop droppableId={'dashboard-drop-window'} type="category">
									{packCategories.length >= 0 &&
										packCategories.map((category: Category, idx: number) => (
											<PackCategory
												category={category}
												packList={packList}
												index={idx}
												key={category?.packCategoryId || idx}
											/>
										))}
								</Drop>
							</DragDropContext>

							{userView && <AddCategoryButton onClick={handleAddPackCategory} />}

							{!userView && (
								<DashboardFooter
									affiliate={packAffiliate}
									description={packAffiliateDescription}
								/>
							)}
						</DashboardContainer>
					</ThemeProvider>
				</UserViewContext.Provider>
			</PackItemHandlerWrapper>
		</PackCategoryHandlerWrapper>
	);
};

export default Dashboard;

const DashboardContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

import './Dashboard.css';
import PackInfo from '../../components/Dashboard/PackInfo/PackInfo';
import PackCategory from '../../components/Dashboard/PackCategory/PackCategory';
import { AddCategoryButton } from '../../components/Dashboard/PackCategory/TableButtons/TableButtons';
import { useParams } from 'react-router-dom';
import { UserViewContext } from './useUserContext';
import {
	useGetPackQuery,
	useGetPackListQuery,
	useAddPackCategoryMutation,
	useMovePackItemMutation,
	useMovePackCategoryMutation,
} from '../../queries/packQueries';
import { useViewPackQuery } from '../../queries/guestQueries';
import { type Category, type Pack } from '../../types/packTypes';
import DashboardFooter from '../../components/Dashboard/DashboardFooter/DashboardFooter';
import { getCategoryIdx } from '../../utils/packUtils';

type DashboardProps = { userView: boolean };

const Dashboard = ({ userView }: DashboardProps) => {
	const { mutate: addCategory } = useAddPackCategoryMutation();
	const { mutate: movePackItem } = useMovePackItemMutation();
	const { mutate: movePackCategory } = useMovePackCategoryMutation();

	const { packId: paramPackId } = useParams();
	const { data, isPending } = userView
		? useGetPackQuery(paramPackId)
		: useViewPackQuery(paramPackId);

	const { data: packListData } = userView
		? useGetPackListQuery()
		: { data: { packList: [] } };
	const { packList } = packListData || { packList: [] };

	let packCategories = data?.categories || [];
	const currentPack = data?.pack || ({} as Pack);
	const packId = data?.pack.packId || null;

	const handleAddPackCategory = () => {
		packId && addCategory(packId);
	};

	const handleOnDragItemEnd = (result: any) => {
		// movePackItem({
		// 	packId: currentPack.packId,
		// 	packItemId,
		// 	packCategoryId,
		// 	packItemIndex,
		// 	prevPackItemIndex,
		// });
	};

	const handleOnDragEnd = (result: any) => {
		// movePackCategory({
		// 	packId: currentPack.packId,
		// 	packCategoryId,
		// 	prevIndex,
		// 	newIndex,
		// });
	};

	const { packAffiliate, packAffiliateDescription } = currentPack;

	return (
		<UserViewContext.Provider value={userView}>
			<div className="dashboard-container">
				<PackInfo
					currentPack={currentPack}
					packCategories={packCategories}
					fetching={isPending}
				/>

				{packCategories.length >= 0 &&
					packCategories.map((category: Category, idx: number) => (
						<PackCategory
							category={category}
							packList={packList}
							index={idx}
							key={category?.packCategoryId || idx}
						/>
					))}

				{userView && <AddCategoryButton onClick={handleAddPackCategory} />}
				{!userView && (
					<DashboardFooter
						affiliate={packAffiliate}
						description={packAffiliateDescription}
					/>
				)}
			</div>
		</UserViewContext.Provider>
	);
};

export default Dashboard;

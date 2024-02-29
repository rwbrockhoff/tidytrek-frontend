import { useParams } from 'react-router-dom';
import DashboardContainer from './DashboardContainer';
import { UserViewContext } from './hooks/useViewerContext';
import { useGetPackListQuery, useGetPackQuery } from '../../queries/packQueries';
import { useViewPackQuery } from '../../queries/guestQueries';
import { HandlerWrapper as PackItemHandler } from './handlers/usePackItemHandlers';
import { HandlerWrapper as PackCategoryHandler } from './handlers/usePackCategoryHandlers';
import { useGetAuthStatusQuery } from '../../queries/userQueries';

const Dashboard = ({ userView }: { userView: boolean }) => {
	const { packId: paramPackId } = useParams();
	const { data: authData } = useGetAuthStatusQuery();

	const isAuthenticated = authData?.isAuthenticated || false;

	const { data, isPending } = userView
		? useGetPackQuery(paramPackId)
		: useViewPackQuery(paramPackId);

	const { data: packListData } = userView
		? useGetPackListQuery()
		: { data: { packList: [] } };

	return (
		<PackCategoryHandler>
			<PackItemHandler>
				<UserViewContext.Provider value={userView}>
					<DashboardContainer
						isPending={isPending}
						isAuthenticated={isAuthenticated}
						paramPackId={paramPackId}
						currentPack={data}
						packList={packListData?.packList || []}
					/>
				</UserViewContext.Provider>
			</PackItemHandler>
		</PackCategoryHandler>
	);
};

export default Dashboard;

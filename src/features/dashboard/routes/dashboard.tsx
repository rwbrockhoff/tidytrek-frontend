import { useParams } from 'react-router-dom';
import { DashboardContainer } from '../components/dashboard-layout/dashboard-container';
import { UserViewContext } from '@/contexts/user-view-context';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { useViewPackQuery } from '@/queries/guest-queries';
import { useGetAuth } from '@/hooks';

export const Dashboard = ({ userView }: { userView: boolean }) => {
	const { packId: paramPackId } = useParams();
	const { isAuthenticated } = useGetAuth();

	const { data, isPending } = userView
		? useGetPackQuery(paramPackId)
		: useViewPackQuery(paramPackId);

	const { data: packListData } = userView
		? useGetPackListQuery()
		: { data: { packList: [] } };

	return (
		<UserViewContext.Provider value={userView}>
			<DashboardContainer
				isPending={isPending}
				isAuthenticated={isAuthenticated}
				paramPackId={paramPackId}
				currentPack={data}
				packList={packListData?.packList || []}
			/>
		</UserViewContext.Provider>
	);
};

import { useParams } from 'react-router-dom';
import { DashboardContainer } from '../components/dashboard-layout/dashboard-container';
import { UserViewContext } from '@/contexts/user-view-context';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { useViewPackQuery } from '@/queries/guest-queries';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { decode } from '@/utils';

export const Dashboard = ({ userView }: { userView: boolean }) => {
	const { packId: paramPackId } = useParams();
	const { isAuthenticated } = useGetAuth();

	const decodedPackId = paramPackId ? decode(paramPackId) : null;

	const userPackQuery = useGetPackQuery(decodedPackId);
	const guestPackQuery = useViewPackQuery(paramPackId);
	
	// Select the appropriate data based on context
	// For guests without a packId, we should redirect them to a valid pack
	const { data, isPending } = userView 
		? userPackQuery
		: guestPackQuery;

	const userPackListQuery = useGetPackListQuery();
	const packListData = userView ? userPackListQuery.data : { packList: [] };

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

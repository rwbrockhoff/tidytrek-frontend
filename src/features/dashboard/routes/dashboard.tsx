import { useParams } from 'react-router-dom';
import { DashboardContainer } from '../components/dashboard-layout/dashboard-container';
import { UserPermissionsProvider } from '@/contexts/user-permissions-context';
import { useUserPermissions } from '@/hooks/auth/use-user-permissions';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { useViewPackQuery } from '@/queries/guest-queries';
import { decode } from '@/utils';

export const Dashboard = ({ isCreator }: { isCreator: boolean }) => {
	const { packId: paramPackId } = useParams();

	const decodedPackId = paramPackId ? decode(paramPackId) : null;

	const userPackQuery = useGetPackQuery(decodedPackId);
	const guestPackQuery = useViewPackQuery(paramPackId);

	// Use creator's pack data or guest view data based on permissions
	const { data, isPending } = isCreator ? userPackQuery : guestPackQuery;

	const userPackListQuery = useGetPackListQuery();
	const packListData = isCreator ? userPackListQuery.data : { packList: [] };

	const permissions = useUserPermissions({ pack: data?.pack });

	return (
		<UserPermissionsProvider value={permissions}>
			<DashboardContainer
				isPending={isPending}
				paramPackId={paramPackId}
				currentPack={data}
				packList={packListData?.packList || []}
			/>
		</UserPermissionsProvider>
	);
};

import { useParams } from 'react-router-dom';
import { DashboardContainer } from '../components/dashboard-layout/dashboard-container';
import { UserPermissionsProvider } from '@/contexts/user-permissions-context';
import { PackProvider } from '@/contexts/pack-context';
import { useUserPermissions } from '@/hooks/auth/use-user-permissions';
import { useLayoutLoading } from '@/hooks/ui/use-layout-loading';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { useViewPackQuery } from '@/queries/guest-queries';
import { useGuestRoute } from '@/hooks/routing/use-route-context';
import { decode } from '@/utils';

export const Dashboard = ({ isCreator }: { isCreator: boolean }) => {
	const { packId: paramPackId } = useParams();
	const isGuestRoute = useGuestRoute();

	const decodedPackId = paramPackId && !isGuestRoute ? decode(paramPackId) : null;

	const userPackQuery = useGetPackQuery(decodedPackId);
	const guestPackQuery = useViewPackQuery(isGuestRoute ? paramPackId : undefined);

	const { data, isPending } = isGuestRoute ? guestPackQuery : userPackQuery;

	const userPackListQuery = useGetPackListQuery();
	const packListData = isCreator ? userPackListQuery.data : { packList: [] };

	const permissions = useUserPermissions({ pack: data?.pack });

	useLayoutLoading(isPending);

	return (
		<UserPermissionsProvider value={permissions}>
			<PackProvider>
				<DashboardContainer
					isPending={isPending}
					paramPackId={paramPackId}
					currentPack={data}
					packList={packListData?.packList || []}
				/>
			</PackProvider>
		</UserPermissionsProvider>
	);
};

import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { type PackListItem } from '@/types/pack-types';
import { DashboardContainer } from '../components/dashboard-layout/dashboard-container';
import { UserPermissionsProvider } from '@/contexts/user-permissions-context';
import { PackProvider } from '@/contexts/pack-context';
import { useUserPermissions } from '@/hooks/auth/use-user-permissions';
import { useLayoutLoading } from '@/hooks/ui/use-layout-loading';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { useViewPackQuery } from '@/queries/guest-queries';
import { useGuestRoute } from '@/hooks/routing/use-route-context';
import { decode } from '@/utils';

const EMPTY_PACK_LIST = { packList: [] as PackListItem[] };
const EMPTY_ARRAY: PackListItem[] = [];

export const Dashboard = ({ isCreator }: { isCreator: boolean }) => {
	const { packId: paramPackId } = useParams();
	const isGuestRoute = useGuestRoute();

	const decodedPackId = paramPackId && !isGuestRoute ? decode(paramPackId) : null;

	const userPackQuery = useGetPackQuery(decodedPackId);
	const guestPackQuery = useViewPackQuery(isGuestRoute ? paramPackId : undefined);

	const { data, isPending } = isGuestRoute ? guestPackQuery : userPackQuery;

	const userPackListQuery = useGetPackListQuery();

	const packListData = useMemo(
		() => (isCreator ? userPackListQuery.data : EMPTY_PACK_LIST),
		[isCreator, userPackListQuery.data],
	);

	const packList = useMemo(
		() => packListData?.packList || EMPTY_ARRAY,
		[packListData?.packList],
	);

	const permissions = useUserPermissions({ pack: data?.pack });

	useLayoutLoading(isPending);

	return (
		<UserPermissionsProvider value={permissions}>
			<PackProvider>
				<DashboardContainer
					isPending={isPending}
					paramPackId={paramPackId}
					currentPack={data}
					packList={packList}
				/>
			</PackProvider>
		</UserPermissionsProvider>
	);
};

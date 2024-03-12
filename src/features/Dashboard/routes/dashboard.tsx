import { useParams } from 'react-router-dom';
import { DashboardContainer } from '../components/dashboard-container';
import { UserViewContext } from '@/hooks/use-viewer-context';
import { useGetAuthStatusQuery } from '@/queries/user-queries';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { useViewPackQuery } from '@/queries/guest-queries';
import { HandlerWrapper as PackItemHandler } from '../handlers/use-pack-item-handlers';
import { HandlerWrapper as PackCategoryHandler } from '../handlers/use-pack-category-handlers';

export const Dashboard = ({ userView }: { userView: boolean }) => {
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

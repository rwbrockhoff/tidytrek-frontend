import { useParams } from 'react-router-dom';
import { DashboardContainer } from '../components/dashboard-container';
import { UserViewContext } from '@/hooks/use-viewer-context';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { useViewPackQuery } from '@/queries/guest-queries';
import { HandlerWrapper as PackItemHandler } from '../handlers/use-pack-item-handlers';
import { HandlerWrapper as PackCategoryHandler } from '../handlers/use-pack-category-handlers';
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
	// throw Error('bad error');
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

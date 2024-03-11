import { useParams } from 'react-router-dom';
import Dashboard from '@/features/Dashboard';
import { UserViewContext } from '@/features/Dashboard/hooks/useViewerContext';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/packQueries';
import { useViewPackQuery } from '@/queries/guestQueries';
import { HandlerWrapper as PackItemHandler } from '@/features/Dashboard/handlers/usePackItemHandlers';
import { HandlerWrapper as PackCategoryHandler } from '@/features/Dashboard/handlers/usePackCategoryHandlers';
import { useGetAuthStatusQuery } from '@/queries/userQueries';

const DashboardView = ({ userView }: { userView: boolean }) => {
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
					<Dashboard
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

export default DashboardView;

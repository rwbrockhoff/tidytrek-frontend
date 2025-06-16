import { Suspense, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';
import { useLogoutMutation } from '@/queries/user-queries';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { encode, lazyImport } from '@/utils';
import { SidebarButton } from './components/sidebar-button';
import { cn } from '@/styles/utils';
import { Heading, Separator, Flex } from '@radix-ui/themes';
import supabase from '@/api/supabaseClient';
import { SidebarFallback } from '../fallback';
import { useGetAuth, useCheckScreen } from '@/hooks';
import { MouseOver } from '@/contexts/mouse-over-context';
const { SidebarMenu } = lazyImport(() => import('./components/menus'), 'SidebarMenu');
const { PackList } = lazyImport(() => import('./components/pack-list'), 'PackList');
const { PopupMenu } = lazyImport(() => import('./components/popup-menu'), 'PopupMenu');

declare const google: any;

type SidebarProps = {
	showSidebar: boolean;
	onToggle: () => void;
};

const Sidebar = ({ showSidebar, onToggle }: SidebarProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { packId: paramPackId } = useParams();
	const { user } = useGetAuth();

	const { data: packListData } = useGetPackListQuery();

	const { mutate: logout } = useLogoutMutation();

	const packList = packListData?.packList || [];
	const defaultPackId = packListData?.packList[0].packId;

	const encodedId = paramPackId || encode(defaultPackId);
	const { data: packData } = useGetPackQuery(encodedId);

	const defaultPackUrl = `/pack/${encodedId}`;
	const currentPackId = packData?.pack?.packId;

	const { isMobile, isTablet } = useCheckScreen();

	useEffect(() => {
		const { pathname } = location;
		const isNotDisplayingPack = currentPackId && !paramPackId;
		// subscribe to user clicking on a different pack
		// subscribe to user loading default dashboard and load packId in url
		if ((pathname.includes('pack') || pathname === '/') && isNotDisplayingPack) {
			const encodedId = encode(currentPackId);
			return navigate(`/pack/${encodedId}`);
			// query disabled until ID, so this does not fetch twice
		}
	}, [currentPackId]);

	useEffect(() => {
		// toggle sidebar menu for mobile link clicks
		if (isMobile && !showSidebar) onToggle();
	}, [location.pathname]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		await google.accounts.id.disableAutoSelect();
		logout();
		navigate('/');
	};

	return (
		<Flex
			asChild
			justify="end"
			className={cn(
				styles.sidebar,
				showSidebar ? styles.sidebarVisible : styles.sidebarHidden
			)}
		>
			<aside>
				<div className={styles.sidebarContainer}>
				{(isMobile || isTablet) && <SidebarButton isSidebar={true} onClick={onToggle} />}

				<Link to={defaultPackUrl} onClick={() => isMobile && onToggle}>
					<Heading as="h1" mb="1">
						tidytrek
					</Heading>
				</Link>

				<Suspense fallback={<SidebarFallback />}>
					<MouseOver>
						<PopupMenu
							profilePhotoUrl={user?.profilePhotoUrl}
							isMobile={isMobile}
							logout={handleLogout}
						/>
					</MouseOver>

					<SidebarMenu />

					<Separator my="4" className={styles.separator} />

					<Heading as="h3" size="5" mb="2">
						Packs
					</Heading>

					<PackList currentPackId={currentPackId} packList={packList} />
				</Suspense>
				</div>
			</aside>
		</Flex>
	);
};

export default Sidebar;


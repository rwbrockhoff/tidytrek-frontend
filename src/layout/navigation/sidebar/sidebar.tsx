import { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Heading, Separator } from '@radix-ui/themes';
import styles from './sidebar.module.css';
import { useLogoutMutation } from '@/queries/user-queries';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { encode } from '@/utils';
import { SidebarButton } from './sidebar-button';
import supabase from '@/api/supabaseClient';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { useCheckScreen } from '@/hooks/ui/use-check-screen';
import { MouseOver } from '@/contexts/mouse-over-context';
import { ThemeToggle } from '@/components/ui';
import { SidebarMenu } from './menus/sidebar-menu/sidebar-menu';
import { PackList } from './pack-list/pack-list';
import { PopoverMenu } from './menus/popover-menu';

declare const google: any;

type SidebarProps = {
	showSidebar: boolean;
	onToggle: () => void;
};

export const Sidebar = ({ showSidebar, onToggle }: SidebarProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { packId: paramPackId } = useParams();
	const { user } = useGetAuth();

	const { data: packListData } = useGetPackListQuery();

	const { mutate: logout } = useLogoutMutation();

	const packList = packListData?.packList || [];
	const defaultPackId = packListData?.packList?.[0]?.packId;

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
	}, [currentPackId, paramPackId, location.pathname, navigate]);

	useEffect(() => {
		// Hide sidebar when navigating on mobile/tablet
		if ((isMobile || isTablet) && showSidebar) {
			onToggle();
		}
	}, [location.pathname]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		if (typeof google !== 'undefined') {
			await google.accounts.id.disableAutoSelect();
		}
		logout();
		navigate('/');
	};

	return (
		<aside
			className={styles.sidebar}
			data-visible={showSidebar}
			aria-label="Main navigation">
			<div className={styles.sidebarContainer}>
				<div className={styles.sidebarHeader}>
					<Link to={defaultPackUrl} onClick={() => isMobile && onToggle()}>
						<Heading as="h1" mb="1">
							tidytrek
						</Heading>
					</Link>
					{showSidebar && <SidebarButton isSidebar onClick={onToggle} />}
				</div>

				<div className={styles.avatarSection}>
					<MouseOver>
						<PopoverMenu
							profilePhotoUrl={user?.profilePhotoUrl}
							isMobile={isMobile}
							logout={handleLogout}
						/>
					</MouseOver>
				</div>

				<SidebarMenu />

				<Separator my="4" className={styles.separator} />

				<Heading as="h3" size="5" mb="2">
					Packs
				</Heading>

				<PackList currentPackId={currentPackId} packList={packList} />

				<div className={styles.sidebarFooter}>{showSidebar && <ThemeToggle />}</div>
			</div>
		</aside>
	);
};

import { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Heading, Separator } from '@radix-ui/themes';
import styles from './sidebar.module.css';
import { useLogoutMutation } from '@/queries/user-queries';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { encode, decode } from '@/utils';
import { SidebarButton } from './sidebar-button';
import { useAuth } from '@/hooks/auth/use-auth';
import { useScreen } from '@/hooks/ui/use-screen';
import { MouseOver } from '@/contexts/mouse-over-context';
import { ThemeToggle } from '@/components/ui';
import { Logo } from '@/layout/logo';
import { SidebarMenu } from './menus/sidebar-menu/sidebar-menu';
import { PackList } from './pack-list/pack-list';
import { PopoverMenu } from './menus/popover-menu';

declare const google:
	| {
		accounts: {
			id: {
				disableAutoSelect: () => Promise<void>;
			};
		};
	}
	| undefined;

type SidebarProps = {
	showSidebar: boolean;
	onToggle: () => void;
};

export const Sidebar = ({ showSidebar, onToggle }: SidebarProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { packId: paramPackId } = useParams();
	const { user } = useAuth();

	const { data: packListData } = useGetPackListQuery();

	const { mutate: logout } = useLogoutMutation();

	const packList = packListData?.packList || [];
	const defaultPackId = packListData?.packList?.[0]?.packId;

	const encodedId = paramPackId || encode(defaultPackId);
	const decodedId = encodedId ? decode(encodedId) : null;
	const { data: packData } = useGetPackQuery(decodedId);

	const defaultPackUrl = `/pack/${encodedId}`;
	const currentPackId = packData?.pack?.packId;

	const { isMobile, isMedium } = useScreen();

	useEffect(() => {
		const { pathname } = location;
		const isNotDisplayingPack = currentPackId && !paramPackId;
		// subscribe to user clicking on a different pack
		// subscribe to user loading default dashboard and load packId in url
		if (
			(pathname.startsWith('/pack/') || pathname === '/' || pathname === '/pack') &&
			isNotDisplayingPack
		) {
			const encodedId = encode(currentPackId);
			navigate(`/pack/${encodedId}`);
			// query disabled until ID, so this does not fetch twice
		}
		// this dependency list is intentional to get our desired toggle behavior
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPackId, paramPackId, location.pathname, navigate]);

	useEffect(() => {
		// Hide sidebar when navigating on mobile/tablet
		if ((isMobile || isMedium) && showSidebar) {
			onToggle();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	const handleLogout = async () => {
		// handle Google auth cleanup first
		if (typeof google !== 'undefined') {
			await google.accounts.id.disableAutoSelect();
		}

		logout(undefined, {
			onSuccess: () => {
				navigate('/', { replace: true });
				navigate(0);
			},
		});
	};

	return (
		<aside
			className={styles.sidebar}
			data-visible={showSidebar}
			aria-label="Main navigation">
			<div className={styles.sidebarContainer}>
				<div className={styles.sidebarHeader}>
					<Link to={defaultPackUrl} viewTransition onClick={() => isMobile && onToggle()}>
						<Logo size={isMobile ? 'base' : 'small'} className="mb-1" />
					</Link>
					{showSidebar && (
						<SidebarButton isSidebar isMobile={isMobile} onClick={onToggle} />
					)}
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

import { Suspense, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogoutMutation } from '@/queries/user-queries';
import { useGetPackListQuery, useGetPackQuery } from '@/queries/pack-queries';
import { encode, lazyImport } from '@/utils';
import { SidebarButton } from './components/sidebar-button';
import { Heading, Separator } from '@radix-ui/themes';
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
		<StyledSidebar $showSidebar={showSidebar}>
			<SidebarContainer>
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

					<StyledSeperator my="4" />

					<Heading as="h3" size="5" mb="2">
						Packs
					</Heading>

					<PackList currentPackId={currentPackId} packList={packList} />
				</Suspense>
			</SidebarContainer>
		</StyledSidebar>
	);
};

export default Sidebar;

const StyledSidebar = styled.aside<{ $showSidebar: boolean }>`
	width: 1280px;
	position: fixed;
	right: 50%;
	transform: translateX(calc(50% - 1030px));
	opacity: ${({ $showSidebar }) => ($showSidebar ? 1 : 0)};
	background: #514f59;
	color: white;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	transition: all 500ms ease;

	a,
	a:visited {
		color: white;
	}

	@media only screen and (max-width: 1280px) {
		z-index: 100;
		width: 20%;
		left: 0;
		opacity: 1;
		transform: ${({ $showSidebar }) => ($showSidebar ? 0 : 'inherit')};
	}

	@media only screen and (max-width: 768px) {
		z-index: 100;
		width: 100%;
		right: 0%;
		opacity: 1;
		transform: ${({ $showSidebar }) => ($showSidebar ? 0 : 'inherit')};
		h3 {
			font-size: 2rem;
		}
	}
`;

const SidebarContainer = styled.div`
	width: 250px;
	height: 100%;
	padding: 3em 50px;
	box-sizing: border-box;
	position: relative;
	${({ theme: t }) => t.mx.mobile(`width: 100%;`)}
`;

export const StyledSeperator = styled(Separator)`
	background-color: #ffffffbd;
	width: 100%;
	opacity: 0.1;
`;

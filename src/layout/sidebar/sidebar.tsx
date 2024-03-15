import { Suspense, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogoutMutation } from '@/queries/user-queries';
import {
	useGetPackListQuery,
	useGetPackQuery,
	useAddNewPackMutation,
	useMovePackMutation,
} from '@/queries/pack-queries';
import { Divider } from 'semantic-ui-react';
import { encode, lazyImport } from '@/utils';
import { DragDropContext, type DropResult } from '@/components';
import { SidebarButton } from './components/sidebar-button';
import useCheckMobile from '@/hooks/use-check-mobile';
import { Header } from '@/components/ui/SemanticUI';
import supabase from '@/api/supabaseClient';
import { SidebarFallback } from '../fallback';
import { useGetAuth } from '@/hooks';
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

	const { data: packData } = useGetPackQuery(paramPackId);
	const { data: packListData } = useGetPackListQuery();

	const { mutate: movePack } = useMovePackMutation();
	const addNewPackData = useAddNewPackMutation();
	const { mutate: addPack } = addNewPackData;
	const { mutate: logout } = useLogoutMutation();

	const packList = packListData?.packList || [];
	const currentPackId = packData?.pack?.packId;
	const defaultPackId = packListData?.packList[0].packId;
	const encodedId = defaultPackId ? encode(defaultPackId) : '';

	const isMobile = useCheckMobile();

	useEffect(() => {
		// subscribe to new pack created event, redirect to new pack
		if (addNewPackData.isSuccess && addNewPackData.data) {
			if ('pack' in addNewPackData.data && paramPackId) {
				const { packId } = addNewPackData.data.pack;
				const encodedId = encode(packId);
				if (paramPackId !== encodedId) {
					addNewPackData.reset();
					navigate(`/pack/${encodedId}`);
				}
			}
		}
	}, [addNewPackData, paramPackId, navigate]);

	useEffect(() => {
		// subscribe to user clicking on a different pack
		if (location.pathname.includes('pack') && currentPackId && !paramPackId) {
			const encodedId = encode(currentPackId);
			navigate(`/pack/${encodedId}`);
		}
	}, [currentPackId]);

	useEffect(() => {
		// toggle sidebar menu for mobile link clicks
		if (isMobile && !showSidebar) onToggle();
	}, [location.pathname]);

	const handleGetPack = async (packId: number) => {
		const { pathname } = location;
		if (currentPackId === undefined) navigate('/');
		const encodedId = encode(packId);
		if (packId !== currentPackId) navigate(`/pack/${encodedId}`);
		if (pathname !== '/') navigate(`/pack/${encodedId}`);
	};

	const handleAddPack = () => addPack();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		await google.accounts.id.disableAutoSelect();
		logout();
	};

	const handleOnDragEnd = (result: DropResult) => {
		const { draggableId, destination, source } = result;
		if (!destination) return;
		const sameIndex = destination.index === source.index;
		if (sameIndex) return;
		movePack({
			packId: draggableId,
			newIndex: destination.index,
			prevIndex: source.index,
		});
	};

	return (
		<StyledSidebar $showSidebar={showSidebar}>
			<SidebarContainer>
				{isMobile && <SidebarButton isSidebar={true} onClick={onToggle} />}

				<Link to={`/pack/${encodedId}`} onClick={() => isMobile && onToggle}>
					<Logo as="h1">tidytrek</Logo>
				</Link>

				<Suspense fallback={<SidebarFallback />}>
					<PopupMenu
						profilePhotoUrl={user?.profilePhotoUrl}
						isMobile={isMobile}
						logout={handleLogout}
					/>

					<SidebarMenu />

					<StyledDivider />

					<DragDropContext onDragEnd={handleOnDragEnd}>
						<PackList
							packList={packList}
							getPack={handleGetPack}
							addPack={handleAddPack}
						/>
					</DragDropContext>
				</Suspense>
			</SidebarContainer>
		</StyledSidebar>
	);
};

export default Sidebar;

const Logo = styled(Header)`
	&&& {
		margin-bottom: 1em;
	}
`;

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

const StyledDivider = styled(Divider)`
	&& {
		margin: 2em 0;
	}
`;

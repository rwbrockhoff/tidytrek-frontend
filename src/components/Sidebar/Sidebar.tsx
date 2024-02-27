import { useLogoutMutation } from '../../queries/userQueries';
import { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	useGetPackListQuery,
	useGetPackQuery,
	useAddNewPackMutation,
	useMovePackMutation,
} from '../../queries/packQueries';
import { useGetAuthStatusQuery } from '../../queries/userQueries';
import { Divider, Sidebar as SemanticSidebar } from 'semantic-ui-react';
import { encode } from '../../utils/generateDisplayId';
import PackList from './PackList/PackList';
import { DragDropContext, type DropResult } from '../../shared/DragDropWrapper';
import PopupMenu from './PackList/Menus/PopupMenu';
import { SidebarMenu } from './PackList/Menus/Menus';
import { SidebarButton } from '../../views/Layout/ViewLayout';
import useCheckMobile from './useCheckMobile';
import { Header } from '../../shared/ui/SemanticUI';

type SidebarProps = {
	showSidebar: boolean;
	onToggle: () => void;
};

const Sidebar = ({ showSidebar, onToggle }: SidebarProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { packId: paramPackId } = useParams();
	const { data: userData } = useGetAuthStatusQuery();
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
	const user = userData?.user;

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
		if (isMobile && showSidebar) onToggle();
	}, [location.pathname]);

	const handleGetPack = async (packId: number) => {
		const { pathname } = location;
		if (currentPackId === undefined) navigate('/');
		const encodedId = encode(packId);
		if (packId !== currentPackId) navigate(`/pack/${encodedId}`);
		if (pathname !== '/') navigate(`/pack/${encodedId}`);
	};

	const handleAddPack = () => addPack();

	const handleLogout = () => {
		logout();
		navigate('/');
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
		<aside>
			<StyledSidebar animation="overlay" visible={showSidebar} $showSidebar={showSidebar}>
				{isMobile && <SidebarButton isSidebar={true} onClick={onToggle} />}

				<Link to={`/pack/${encodedId}`} onClick={() => isMobile && onToggle}>
					<Header as="h1">tidytrek</Header>
				</Link>

				<PopupMenu
					profilePhotoUrl={user?.profilePhotoUrl}
					isMobile={isMobile}
					logout={handleLogout}
				/>

				<SidebarMenu />

				<StyledDivider />

				<DragDropContext onDragEnd={handleOnDragEnd}>
					<PackList packList={packList} getPack={handleGetPack} addPack={handleAddPack} />
				</DragDropContext>
			</StyledSidebar>
		</aside>
	);
};

export default Sidebar;

type StyleProps = { $showSidebar: boolean };
const StyledSidebar = styled(SemanticSidebar)<StyleProps>`
	&&&& {
		background: #514f59;
		color: white;
		height: 100vh;
		width: 20vw;
		padding: 5vh 50px;
		position: absolute;
		h1 {
			margin-bottom: 50px;
		}
		h3 {
			color: white;
		}
		a,
		a:visited {
			color: white;
		}

		@media only screen and (max-width: 768px) {
			width: ${(props) => (props.$showSidebar ? '100vw' : '0vw')};
			padding: ${(props) => (props.$showSidebar ? '5vh 50px' : 0)};

			h3 {
				font-size: 2em;
			}
		}
	}
`;

const StyledDivider = styled(Divider)`
	&& {
		margin: 25px 0px;
	}
`;

import './Sidebar.css';
import { useLogoutMutation } from '../../queries/userQueries';
import { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import {
	useGetPackListQuery,
	useGetPackQuery,
	useAddNewPackMutation,
	useMovePackMutation,
} from '../../queries/packQueries';
import { Divider, Icon } from 'semantic-ui-react';
import { encode } from '../../utils/generateDisplayId';
import PackList from './PackList/PackList';
import { DragEndEvent } from '@dnd-kit/core';

const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { packId: paramPackId } = useParams();

	const { data: packData } = useGetPackQuery(paramPackId);
	const { data: packListData } = useGetPackListQuery();

	const { mutate: movePack } = useMovePackMutation();
	const addNewPackData = useAddNewPackMutation();
	const { mutate: addPack } = addNewPackData;
	const { mutate: logout } = useLogoutMutation();

	const packList = packListData?.packList || [];
	const currentPackId = packData?.pack.packId;
	const defaultPackId = packListData?.packList[0].packId;
	const encodedId = defaultPackId ? encode(defaultPackId) : '';

	useEffect(() => {
		// subscribe to new pack created event, redirect to new pack
		if (addNewPackData.isSuccess && addNewPackData.data) {
			if ('pack' in addNewPackData.data && paramPackId) {
				const { packId } = addNewPackData.data.pack;
				const encodedId = encode(packId);
				if (paramPackId !== encodedId) {
					addNewPackData.reset();
					navigate(`/packs/${encodedId}`);
				}
			}
		}
	}, [addNewPackData, paramPackId, navigate]);

	useEffect(() => {
		// subscribe to "/" loading default pack, navigate w/ packId for query cache
		if (location.pathname.includes('pack') && currentPackId && !paramPackId) {
			const encodedId = encode(currentPackId);
			navigate(`/packs/${encodedId}`);
		}
	}, [currentPackId]);

	const handleGetPack = async (packId: number) => {
		const { pathname } = location;
		if (currentPackId === undefined) navigate('/');
		const encodedId = encode(packId);
		if (packId !== currentPackId) navigate(`/packs/${encodedId}`);
		if (pathname !== '/') navigate(`/packs/${encodedId}`);
	};

	const handleAddPack = () => {
		addPack();
	};

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	const handleOnDragEnd = (result: DragEndEvent) => {
		const { active, over } = result;
		if (!over || !active) return;

		const packId = Number(active.id);
		const prevIndex = active.data.current?.index;
		const newIndex = over?.data.current?.index;

		if (prevIndex === newIndex) return;

		movePack({ packId, newIndex, prevIndex });
	};

	return (
		<nav>
			<h1>
				<Link to={`/packs/${encodedId}`}>tidytrek</Link>
			</h1>
			<menu className="nav-menu">
				<li>
					<Link to="/account">
						<Icon name="user outline" />
						Account
					</Link>
				</li>
				<li>
					<Link to="/gear-closet">
						<Icon name="archive" />
						Gear Closet
					</Link>
				</li>
				<li onClick={handleLogout}>
					<Icon name="log out" />
					Log Out
				</li>
			</menu>
			<Divider />
			<PackList
				packList={packList}
				getPack={handleGetPack}
				addPack={handleAddPack}
				onDragEnd={handleOnDragEnd}
			/>
		</nav>
	);
};

export default Sidebar;

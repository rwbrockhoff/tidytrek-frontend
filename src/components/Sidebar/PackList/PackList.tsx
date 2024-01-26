import './PackList.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Header, Divider, Icon } from 'semantic-ui-react';
import { PackListItem as PackListItemType } from '../../../redux/packs/packTypes';
import {
	useGetPackListQuery,
	useGetPackQuery,
	useAddNewPackMutation,
	useMovePackMutation,
} from '../../../redux/newPacks/newPacksApiSlice';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import PackListItem from './PackListItem/PackListItem';
import { useEffect } from 'react';

const PackList = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { packId: paramPackId } = useParams();

	const { data: packListData } = useGetPackListQuery();
	const { data: packData } = useGetPackQuery(Number(paramPackId));

	const [addPack, addPackResult] = useAddNewPackMutation();
	const [movePack] = useMovePackMutation();

	useEffect(() => {
		if (addPackResult.isSuccess && addPackResult.data) {
			if ('pack' in addPackResult.data) {
				const { packId } = addPackResult.data.pack;
				navigate(`/packs/${packId}`);
			}
		}
	}, [addPackResult, navigate]);

	const packList = packListData?.packList || [];
	const currentPackId = packData?.pack.packId;

	const handleGetPack = async (packId: number) => {
		const { pathname } = location;
		if (currentPackId === undefined) navigate('/');
		if (packId !== currentPackId) navigate(`/packs/${packId}`);
		if (pathname !== '/') navigate(`/packs/${packId}`);
	};

	const handleAddPack = () => {
		addPack();
	};

	const onDragEnd = (result: DropResult) => {
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
		<div className="pack-list-container">
			<Header as="h3" className="pack-title">
				Packs
			</Header>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId={'sidebar-pack-list'}>
					{(provided) => (
						<>
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className="pack-list-item">
								{packList.map((pack: PackListItemType, index: number) => {
									return (
										<PackListItem
											index={index}
											key={pack.packId}
											pack={pack}
											onClick={handleGetPack}
										/>
									);
								})}
								{provided.placeholder}
							</div>
						</>
					)}
				</Droppable>
			</DragDropContext>
			<Divider />
			<p onClick={handleAddPack} className="add-new-pack-button">
				<Icon name="add" />
				Create New Pack
			</p>
		</div>
	);
};

export default PackList;

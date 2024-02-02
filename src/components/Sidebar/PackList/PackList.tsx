import './PackList.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Header, Divider, Icon } from 'semantic-ui-react';
import { PackListItem as PackListItemType } from '../../../types/packTypes';
import {
	useGetPackListQuery,
	useGetPackQuery,
	useAddNewPackMutation,
	useMovePackMutation,
} from '../../../queries/packQueries';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import PackListItem from './PackListItem/PackListItem';
import { useEffect } from 'react';
import { encode } from '../../../utils/generateDisplayId';

const PackList = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { packId: paramPackId } = useParams();
	const { data: packData } = useGetPackQuery(paramPackId);

	const { data: packListData } = useGetPackListQuery();
	const { mutate: movePack } = useMovePackMutation();

	const addNewPackData = useAddNewPackMutation();
	const { mutate: addPack } = addNewPackData;

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

	const packList = packListData?.packList || [];
	const currentPackId = packData?.pack.packId;

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

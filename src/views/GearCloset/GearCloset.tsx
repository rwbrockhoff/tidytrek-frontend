import { Header } from 'semantic-ui-react';
import './GearCloset.css';
import GearClosetList from '../../components/GearCloset/GearClosetList/GearClosetList';
import {
	useGetGearClosetQuery,
	useMoveGearClosetItemMutation,
} from '../../queries/closetQueries';
import { useGetPackListQuery } from '../../queries/packQueries';
import { UserViewContext } from '../Dashboard/useUserContext';
import { type DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from '../../shared/DragDropWrapper';

const GearCloset = () => {
	const { data } = useGetGearClosetQuery();
	const { gearClosetList } = data || { gearClosetList: [] };
	const { data: packListData } = useGetPackListQuery();
	const { packList } = packListData || { packList: [] };

	const { mutate: moveGearClosetItem } = useMoveGearClosetItemMutation();

	const handleOnDragEnd = (result: DropResult) => {
		const { draggableId, destination, source } = result;
		if (!destination) return;

		const sameIndex = destination.index === source.index;
		const sameCategory = destination.droppableId === source.droppableId;

		if (sameIndex && sameCategory) return;

		moveGearClosetItem({
			packItemId: draggableId,
			packItemIndex: destination.index,
			prevPackItemIndex: source.index,
		});
	};

	return (
		<UserViewContext.Provider value={true}>
			<div>
				<Header as="h1" textAlign="center" className="gear-closet-header">
					Gear Closet
				</Header>

				<DragDropContext onDragEnd={handleOnDragEnd}>
					<GearClosetList gearClosetList={gearClosetList} packList={packList} />
				</DragDropContext>
			</div>
		</UserViewContext.Provider>
	);
};

export default GearCloset;

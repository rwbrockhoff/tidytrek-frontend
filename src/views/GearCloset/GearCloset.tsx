import { Header as SemHeader } from 'semantic-ui-react';
import { Input } from '../../shared/ui/SemanticUI';
import { useState } from 'react';
import styled from 'styled-components';
import GearClosetList from '../../components/GearCloset/GearClosetList/GearClosetList';
import {
	useGetGearClosetQuery,
	useMoveGearClosetItemMutation,
} from '../../queries/closetQueries';
import { useGetPackListQuery } from '../../queries/packQueries';
import { UserViewContext } from '../Dashboard/useUserContext';
import { type DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from '../../shared/DragDropWrapper';
import { type InputEvent } from '../../shared/formHelpers';
import { searchMatch } from '../../shared/formHelpers';

const GearCloset = () => {
	const [searchInput, setSearchInput] = useState('');
	const { data } = useGetGearClosetQuery();
	const { gearClosetList } = data || { gearClosetList: [] };
	const { data: packListData } = useGetPackListQuery();
	const { packList } = packListData || { packList: [] };

	const { mutate: moveGearClosetItem } = useMoveGearClosetItemMutation();

	const handleInputChange = (e: InputEvent) => setSearchInput(e.target.value);

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

	const filteredClosetList = gearClosetList.filter((item) =>
		searchMatch(searchInput, item.packItemName, 'i'),
	);

	const dragDisabled = searchInput.length ? true : false;
	const isEmptyList = !filteredClosetList.length && searchInput.length ? true : false;

	return (
		<UserViewContext.Provider value={true}>
			<div>
				<Header as="h1" className="gear-closet-header">
					Gear Closet
				</Header>

				<SearchContainer>
					<Input
						fluid
						icon="search"
						placeholder="Search..."
						name="searchInput"
						value={searchInput}
						onChange={handleInputChange}
					/>
				</SearchContainer>

				<DragDropContext onDragEnd={handleOnDragEnd}>
					<GearClosetList
						gearClosetList={filteredClosetList}
						packList={packList}
						isEmptyList={isEmptyList}
						dragDisabled={dragDisabled}
					/>
				</DragDropContext>
			</div>
		</UserViewContext.Provider>
	);
};

export default GearCloset;

const Header = styled(SemHeader)`
	&&& {
		margin-top: 25px;
		margin-bottom: 25px;
		text-align: center;
	}
`;

const SearchContainer = styled.div`
	&&& {
		width: 20vw;
		margin-bottom: 50px;
		margin-left: auto;
		margin-right: auto;
	}
`;

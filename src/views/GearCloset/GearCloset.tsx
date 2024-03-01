import { type DropResult } from 'react-beautiful-dnd';
import { type PackItem, type PackInfo } from '../../types/packTypes';
import { type InputEvent } from '../../types/formTypes';
import { Header as SemHeader } from 'semantic-ui-react';
import { Input } from '../../shared/ui/SemanticUI';
import { useState } from 'react';
import styled from 'styled-components';
import GearClosetList from '../../components/GearCloset/GearClosetList/GearClosetList';
import {
	useGetGearClosetQuery,
	useMoveGearClosetItemMutation,
	useEditGearClosetItemMutation,
	useMoveItemToPackMutation,
	useDeleteGearClosetItemMutation,
} from '../../queries/closetQueries';
import { useGetPackListQuery } from '../../queries/packQueries';
import { UserViewContext } from '../Dashboard/hooks/useViewerContext';
import { DragDropContext } from '../../shared/components/DragDropWrapper';
import { searchMatch } from '../../shared/formHelpers';
import { mobile } from '../../shared/mixins/mixins';

const GearCloset = () => {
	const [searchInput, setSearchInput] = useState('');
	const { data } = useGetGearClosetQuery();
	const { gearClosetList } = data || { gearClosetList: [] };
	const { data: packListData } = useGetPackListQuery();
	const { packList } = packListData || { packList: [] };

	const { mutate: editItem } = useEditGearClosetItemMutation();
	const { mutate: moveToPack } = useMoveItemToPackMutation();
	const { mutate: deleteItem } = useDeleteGearClosetItemMutation();
	const { mutate: moveGearClosetItem } = useMoveGearClosetItemMutation();

	const handleInputChange = (e: InputEvent) => setSearchInput(e.target.value);

	const handleOnSave = (packItem: PackItem) => editItem(packItem);

	const handleDelete = (packItemId: number) => deleteItem(packItemId);

	const handleMoveItemToPack = (packInfo: PackInfo) => moveToPack(packInfo);

	const handleOnDragEnd = (result: DropResult) => {
		const { draggableId, destination, source } = result;
		if (!destination) return;

		const sameIndex = destination.index === source.index;
		const sameCategory = destination.droppableId === source.droppableId;

		if (sameIndex && sameCategory) return;
		const dragId = draggableId.replace(/\D/g, '');

		moveGearClosetItem({
			packItemId: dragId,
			packItemIndex: destination.index,
			prevPackItemIndex: source.index,
		});
	};

	const filteredClosetList = gearClosetList.filter((item) =>
		searchMatch(searchInput, item.packItemName, 'i'),
	);

	const dragDisabled = searchInput.length ? true : false;
	const listHasItems = filteredClosetList.length ? true : false;

	return (
		<UserViewContext.Provider value={true}>
			<div>
				<Header as="h1">Gear Closet</Header>

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
						listHasItems={listHasItems}
						dragDisabled={dragDisabled}
						onMove={handleMoveItemToPack}
						onSave={handleOnSave}
						onDelete={handleDelete}
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
		${mobile(`width: 95%;`)}
	}
`;

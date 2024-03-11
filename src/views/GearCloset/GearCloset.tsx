import { type InputEvent } from '../../types/formTypes';
import { Header as SemHeader } from 'semantic-ui-react';
import { Input } from '../../shared/ui/SemanticUI';
import { useState } from 'react';
import styled from 'styled-components';
import GearClosetList from '../../components/GearCloset/GearClosetList/GearClosetList';
import { useGetGearClosetQuery } from '../../queries/closetQueries';
import { useGetPackListQuery } from '../../queries/packQueries';
import { UserViewContext } from '../Dashboard/hooks/useViewerContext';
import { searchMatch } from '../../utils/formHelpers';

const GearCloset = () => {
	const [searchInput, setSearchInput] = useState('');
	const { data } = useGetGearClosetQuery();
	const { gearClosetList } = data || { gearClosetList: [] };
	const { data: packListData } = useGetPackListQuery();
	const { packList } = packListData || { packList: [] };

	const handleInputChange = (e: InputEvent) => setSearchInput(e.target.value);

	const filteredClosetList = gearClosetList.filter((item) =>
		searchMatch(searchInput, item.packItemName, 'i'),
	);

	const dragDisabled = searchInput.length ? true : false;
	const listHasItems = filteredClosetList.length ? true : false;

	return (
		<main>
			<UserViewContext.Provider value={true}>
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

				<GearClosetList
					gearClosetList={filteredClosetList}
					packList={packList}
					listHasItems={listHasItems}
					dragDisabled={dragDisabled}
				/>
			</UserViewContext.Provider>
		</main>
	);
};

export default GearCloset;

const Header = styled(SemHeader)`
	&&& {
		margin-top: 1.5em;
		margin-bottom: 1.5em;
		text-align: center;
	}
`;

const SearchContainer = styled.div`
	&&& {
		width: 50%;
		margin-bottom: 2em;
		margin-left: auto;
		margin-right: auto;
		${({ theme: t }) => t.mx.mobile(`width: 90%;`)}
	}
`;

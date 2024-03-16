import styled from 'styled-components';
import { type InputEvent } from '@/types/form-types';
import { useState } from 'react';
import { Input } from '@/components/ui/SemanticUI';
import { GearClosetList } from '../components/gear-closet-list';
import { useGetGearClosetQuery } from '@/queries/closet-queries';
import { useGetPackListQuery } from '@/queries/pack-queries';
import { UserViewContext } from '@/hooks/use-viewer-context';
import { searchMatch } from '@/utils';
import { Heading } from '@radix-ui/themes';

export const GearCloset = () => {
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
				<Heading align="center" size="6" mt="9" mb="5">
					Gear Closet
				</Heading>

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

const SearchContainer = styled.div`
	&&& {
		width: 50%;
		margin-bottom: 2em;
		margin-left: auto;
		margin-right: auto;
		${({ theme: t }) => t.mx.mobile(`width: 90%;`)}
	}
`;
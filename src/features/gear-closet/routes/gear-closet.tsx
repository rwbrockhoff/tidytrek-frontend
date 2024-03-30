import styled from 'styled-components';
import { type InputEvent } from '@/types/form-types';
import { useState } from 'react';
import { SearchIcon } from '@/components/ui';
import { Heading, TextField } from '@radix-ui/themes';
import { GearClosetList } from '../components/gear-closet-list';
import { useGetGearClosetQuery } from '@/queries/closet-queries';
import { useGetPackListQuery } from '@/queries/pack-queries';
import { UserViewContext } from '@/hooks/use-viewer-context';
import { searchMatch } from '@/utils';

export const GearCloset = () => {
	const [searchInput, setSearchInput] = useState('');

	const { data } = useGetGearClosetQuery();
	const { gearClosetList } = data || { gearClosetList: [] };

	const { data: packListData } = useGetPackListQuery();
	const { packList } = packListData || { packList: [] };

	const handleInputChange = (e: InputEvent) => setSearchInput(e.target.value);

	const filteredClosetList =
		gearClosetList.filter(
			(item) =>
				searchMatch(searchInput, item.packItemName, 'i') ||
				searchMatch(searchInput, item.packItemDescription, 'i'),
		) || [];

	const isSearching = searchInput.length > 0;
	const dragDisabled = isSearching ? true : false;
	const listHasItems = filteredClosetList.length ? true : false;
	const listToDisplay = isSearching ? filteredClosetList : gearClosetList;
	return (
		<main>
			<UserViewContext.Provider value={true}>
				<Heading align="center" size="6" mt="9" mb="5">
					Gear Closet
				</Heading>

				<SearchContainer>
					<TextField.Root>
						<TextField.Slot>
							<SearchIcon />
						</TextField.Slot>
						<TextField.Input
							radius="medium"
							size="3"
							placeholder="Search..."
							name="searchInput"
							value={searchInput}
							onChange={handleInputChange}
						/>
					</TextField.Root>
				</SearchContainer>

				<GearClosetList
					gearClosetList={listToDisplay}
					packList={packList}
					listHasItems={listHasItems}
					dragDisabled={dragDisabled}
				/>
			</UserViewContext.Provider>
		</main>
	);
};

const SearchContainer = styled.div`
	width: 50%;
	margin-bottom: 2em;
	margin-left: auto;
	margin-right: auto;
	${({ theme: t }) => t.mx.mobile(`width: 90%;`)}
`;

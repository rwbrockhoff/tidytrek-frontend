import styles from './gear-closet.module.css';
import { type InputEvent } from '@/types/form-types';
import { useState } from 'react';
import { ClosetIcon, SearchIcon } from '@/components/ui';
import { Flex, Heading, TextField } from '@radix-ui/themes';
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
				<Flex
					className={styles.headerText}
					align="center"
					justify="center"
					gap="3"
					mt="9">
					<ClosetIcon />
					<Heading size="6">Gear Closet</Heading>
				</Flex>

				{!listHasItems && (
					<p className={styles.descriptionText}>
						Keep track of other pack items that don't have a pack list yet!{' '}
					</p>
				)}

				<div className={styles.searchContainer}>
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
				</div>

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

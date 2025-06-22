import styles from './gear-closet.module.css';
import { mx } from '@/styles/utils';
import { type InputEvent } from '@/types/form-types';
import { useState } from 'react';
import { ClosetIcon, SearchIcon } from '@/components/ui';
import { Flex, Heading, TextField } from '@radix-ui/themes';
import { GearClosetList } from '../components/gear-closet-list';
import { useGetGearClosetQuery } from '@/queries/closet-queries';
import { useGetPackListQuery } from '@/queries/pack-queries';
import { UserViewContext } from '@/hooks/use-viewer-context';
import { searchMatch } from '@/utils';
import { cn } from '@/styles/utils/cn';

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
	const originalListHasItems = gearClosetList.length > 0;
	const displayListHasItems = isSearching
		? filteredClosetList.length > 0
		: originalListHasItems;
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

				{!originalListHasItems && (
					<p className={styles.descriptionText}>
						Keep track of other pack items that don't have a pack list yet!
					</p>
				)}

				<div className={cn(styles.searchContainer, mx.responsiveContent)}>
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
							className="input-with-icon"
						/>
					</TextField.Root>
				</div>

				<GearClosetList
					gearClosetList={listToDisplay}
					packList={packList}
					listHasItems={displayListHasItems}
					dragDisabled={dragDisabled}
				/>
			</UserViewContext.Provider>
		</main>
	);
};

import styles from './gear-closet.module.css';
import { mx } from '@/styles/utils';
import { type InputEvent } from '@/types/form-types';
import { useState } from 'react';
import { ClosetIcon, SearchIcon, TextField } from '@/components/ui';
import { Flex, Heading } from '@radix-ui/themes';
import { ResponsiveGearCloset } from '../components/responsive-gear-closet';
import { useGetGearClosetQuery } from '@/queries/closet-queries';
import { useGetPackListQuery } from '@/queries/pack-queries';
import { UserViewContext } from '@/hooks/use-viewer-context';
import { searchMatch } from '@/utils';
import { cn } from '@/styles/utils/cn';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';

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
		<UserViewContext.Provider value={true}>
			<PageLayout>
				<Flex className={styles.headerText} align="center" justify="center" gap="3">
					<ClosetIcon />
					<Heading size="6">Gear Closet</Heading>
				</Flex>

				{!originalListHasItems && (
					<p className={styles.descriptionText}>
						Keep track of other pack items that don't have a pack list yet!
					</p>
				)}

				<div className={cn(styles.searchContainer, mx.responsiveContent)}>
					<TextField.Standalone
						variant="icon"
						placeholder="Search..."
						name="searchInput"
						value={searchInput}
						onChange={handleInputChange}
						icon={<SearchIcon />}
						iconPosition="left"
					/>
				</div>

				<ResponsiveGearCloset
					gearClosetList={listToDisplay}
					packList={packList}
					listHasItems={displayListHasItems}
					dragDisabled={dragDisabled}
				/>
			</PageLayout>
		</UserViewContext.Provider>
	);
};

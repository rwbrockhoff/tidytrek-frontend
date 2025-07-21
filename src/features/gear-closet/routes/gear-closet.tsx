import styles from './gear-closet.module.css';
import { mx } from '@/styles/utils';
import { type InputEvent } from '@/types/form-types';
import { useState } from 'react';
import { ClosetIcon, SearchIcon } from '@/components/icons';
import { TextField } from '@/components/alpine';
import { Flex, Stack, Box } from '@/components/layout';
import { Heading } from '@radix-ui/themes';
import { ResponsiveGearCloset } from '../components/gear-closet-list/responsive-gear-closet';
import { useGetGearClosetQuery } from '@/queries/closet-queries';
import { useGetPackListQuery } from '@/queries/pack-queries';
import { UserViewContext } from '@/contexts/user-view-context';
import { searchMatch } from '@/utils';
import { cn } from '@/styles/utils/cn';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';

export const GearCloset = () => {
	const [searchInput, setSearchInput] = useState('');

	const { data, isLoading } = useGetGearClosetQuery();
	const { gearClosetList } = data || { gearClosetList: [] };

	const { data: packListData } = useGetPackListQuery();
	const { packList } = packListData || { packList: [] };

	const handleInputChange = (e: InputEvent) => setSearchInput(e.target.value);

	const filteredClosetList = gearClosetList.filter(
		(item) =>
			searchMatch(searchInput, item.packItemName, 'i') ||
			searchMatch(searchInput, item.packItemDescription, 'i'),
	);

	const isSearching = searchInput.length > 0;
	const dragDisabled = isSearching || isLoading;
	const hasItems = gearClosetList.length > 0;
	const filteredList = isSearching ? filteredClosetList : gearClosetList;
	const showResults = isSearching ? filteredClosetList.length > 0 : hasItems;
	const showEmptyListDescription = !hasItems && !isLoading;
	return (
		<UserViewContext.Provider value={true}>
			<PageLayout>
				<Stack className="gap-4">
					<Heading size="6">
						<Flex className="items-center justify-center gap-2">
							<ClosetIcon />
							Gear Closet
						</Flex>
					</Heading>

					{showEmptyListDescription && (
						<p className={styles.descriptionText}>
							Keep track of other pack items that don't have a pack list yet!
						</p>
					)}

					<Box className={cn(mx.responsiveContent, 'mx-auto mb-8')}>
						<TextField.Standalone
							variant="icon"
							placeholder="Search..."
							name="searchInput"
							value={searchInput}
							onChange={handleInputChange}
							icon={<SearchIcon />}
							iconPosition="left"
						/>
					</Box>

					<ResponsiveGearCloset
						gearClosetList={filteredList}
						packList={packList}
						listHasItems={showResults}
						dragDisabled={dragDisabled}
					/>
				</Stack>
			</PageLayout>
		</UserViewContext.Provider>
	);
};

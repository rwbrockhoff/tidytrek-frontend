import styles from './dashboard-container.module.css';
import { PackInfo } from './pack-info/pack-info';
import { PackCategory } from './pack-category';
import { AddCategoryButton } from '@/components/table';
import { PricingContext, useUserContext } from '@/hooks/use-viewer-context';
import {
	InitialState as UserState,
	type Category,
	PackListItem,
} from '@/types/pack-types';
import { InitialState as GuestState } from '@/queries/guest-queries';
import { DashboardFooter } from './dashboard-footer';
import { DragDropContext, Drop, ProfileBanner, type DropResult } from '@/components';
import { useGuestData } from '../hooks/use-guest-data';
import { usePackCategoryHandlers } from '../handlers/use-pack-category-handlers';
import { Flex } from '@radix-ui/themes';

type DashboardProps = {
	isAuthenticated: boolean;
	isPending: boolean;
	paramPackId: string | undefined;
	currentPack: UserState | GuestState | undefined;
	packList: PackListItem[] | [];
};

export const DashboardContainer = (props: DashboardProps) => {
	const userView = useUserContext();
	const { isAuthenticated, isPending, paramPackId, currentPack, packList } = props;
	const { pack, categories } = currentPack || {};
	const packCategories = categories || [];
	const packId = pack?.packId || null;

	const { handlers } = usePackCategoryHandlers();
	const { onDragEnd, addCategory } = handlers;

	//--Guest View Data--//
	const { userProfile, settings } = useGuestData(currentPack);
	//--Guest View Data--//

	const handleOnDragEnd = (result: DropResult) => {
		if (pack) {
			// Attach categories to pack object for drag handler
			const packWithCategories = { ...pack, categories: packCategories };
			onDragEnd(result, packWithCategories, paramPackId);
		}
	};

	const {
		packAffiliate = false,
		packAffiliateDescription = '',
		packPricing = false,
	} = pack || {};

	const isGuestView = !userView && !isAuthenticated;
	if (!pack) return;

	return (
		<PricingContext.Provider value={packPricing}>
			<main className={styles.container}>
					{!userView && <ProfileBanner />}
					<PackInfo
						currentPack={pack}
						packCategories={packCategories}
						userProfile={userProfile}
						settings={settings}
						fetching={isPending}
					/>

					<DragDropContext onDragEnd={handleOnDragEnd}>
						<Drop droppableId={'dashboard-drop-window'} type="category">
							{packCategories.length > 0 &&
								packCategories.map((category: Category, index: number) => {
									return (
										<PackCategory
											category={category}
											packList={packList}
											index={index}
											key={category.packCategoryId}
										/>
									);
								})}
						</Drop>
					</DragDropContext>

					{userView && (
						<Flex justify="center" width="100%">
							<AddCategoryButton onClick={() => packId && addCategory(packId, packCategories)} />
						</Flex>
					)}

					{isGuestView && (
						<DashboardFooter
							affiliate={packAffiliate}
							description={packAffiliateDescription}
						/>
					)}
			</main>
		</PricingContext.Provider>
	);
};


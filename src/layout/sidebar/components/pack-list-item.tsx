import { GripIcon } from '@/components/ui';
import { PackListItem as ListItem } from '@/types/pack-types';
import { Text } from '@radix-ui/themes';
import styles from './pack-list-item.module.css';

type PackListItemProps = {
	pack: ListItem;
	onClick: (packId: number) => void;
};

export const PackListItem = ({ pack, onClick }: PackListItemProps) => {
	return (
		<div key={pack.packId} onClick={() => onClick(pack.packId)} className={styles.itemContainer}>
			<Text size="3" className={styles.styledText}>
				<span className={styles.gripContainer}>
					<GripIcon />
				</span>
				{pack.packName}
			</Text>
		</div>
	);
};


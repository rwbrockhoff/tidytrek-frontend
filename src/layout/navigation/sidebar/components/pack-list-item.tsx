import { GripIcon } from '@/components/ui';
import { PackListItem as ListItem } from '@/types/pack-types';
import { Text } from '@radix-ui/themes';
import styles from './pack-list-item.module.css';
import { mx } from '@/styles/utils';

type PackListItemProps = {
	pack: ListItem;
	onClick: (packId: number) => void;
	dragProps?: any;
};

export const PackListItem = ({ pack, onClick, dragProps }: PackListItemProps) => {
	return (
		<div
			key={pack.packId}
			onClick={() => onClick(pack.packId)}
			className={styles.packListItemContainer}
			data-testid="pack-list-row">
			<Text className={styles.styledText}>
				<span
					className={styles.gripContainer}
					{...dragProps}
					data-testid="pack-list-grip">
					<GripIcon size={16} className={mx.invisible} />
				</span>
				{pack.packName}
			</Text>
		</div>
	);
};

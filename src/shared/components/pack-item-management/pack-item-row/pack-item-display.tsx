import { convertCurrency } from '@/utils';
import { LinkIcon } from '@/components/icons';
import { Stack } from '@/components/layout';
import { type BaseTableRowItem } from '@/types/pack-types';
import styles from './pack-item-row.module.css';

type PackItemDisplayProps = {
	item: BaseTableRowItem;
	className?: string;
};

export const PackItemDisplay = ({ item, className }: PackItemDisplayProps) => {
	return (
		<div className={className}>
			<Stack className="gap-3">
				<div className={styles.itemHeader}>
					<div className={styles.itemNameContainer}>
						{item.packItemUrl ? (
							<a
								href={item.packItemUrl}
								className={styles.itemNameLink}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View pack item product link">
								<LinkIcon />
								<h4 className={styles.itemName}>{item.packItemName || 'Name'}</h4>
							</a>
						) : (
							<h4 className={styles.itemName}>{item.packItemName || 'Name'}</h4>
						)}
					</div>
					{item.packItemPrice && (
						<span className={styles.itemPrice}>
							{convertCurrency(item.packItemPrice, 'USD')}
						</span>
					)}
				</div>

				{item.packItemDescription && (
					<div className={styles.itemDetails}>
						<p className={styles.itemDescription}>{item.packItemDescription}</p>
					</div>
				)}
			</Stack>
		</div>
	);
};
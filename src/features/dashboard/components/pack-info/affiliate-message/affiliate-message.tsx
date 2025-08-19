import { Text, Tooltip } from '@radix-ui/themes';
import { InfoIcon } from '@/components/icons';
import { Flex } from '@/components/layout';
import styles from './affiliate-message.module.css';

type AffiliateMessageProps = {
	description: string;
	username?: string;
};

export const AffiliateMessage = ({ description, username }: AffiliateMessageProps) => {
	const tooltipMessage = username 
		? `This means ${username} may earn a commission if you buy through them`
		: `This means the creator may earn a commission if you buy through them`;
		
	return (
		<Flex className="items-center gap-1 mt-1">
			<Text className={styles.affiliateText}>
				{description || 'Some links may be affiliate links'}
			</Text>
			<Tooltip content={tooltipMessage}>
				<InfoIcon className={styles.infoIcon} />
			</Tooltip>
		</Flex>
	);
};
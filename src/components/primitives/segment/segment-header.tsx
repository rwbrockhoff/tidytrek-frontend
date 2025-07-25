import { Stack } from '@/components/layout';
import styles from '@/shared/styles/segment-headers.module.css';

type SegmentHeaderProps = {
	title: string;
	description?: string;
};

export const SegmentHeader = ({ title, description }: SegmentHeaderProps) => {
	return (
		<Stack className={styles.segmentHeader}>
			<p className={styles.segmentTitle}>{title}</p>
			{description && <p className={styles.segmentDescription}>{description}</p>}
		</Stack>
	);
};
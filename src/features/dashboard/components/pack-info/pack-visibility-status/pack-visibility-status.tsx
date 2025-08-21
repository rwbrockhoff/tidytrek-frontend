import { PublicIcon, PrivateIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import styles from '../pack-info.module.css';

type PackVisibilityStatusProps = {
	isPublic: boolean;
	className?: string;
};

export const PackVisibilityStatus = ({
	isPublic,
	className,
}: PackVisibilityStatusProps) => (
	<p className={cn(styles.lightText, className, 'flex items-center gap-1')}>
		{isPublic ? (
			<>
				<PublicIcon /> Public
			</>
		) : (
			<>
				<PrivateIcon /> Private
			</>
		)}
	</p>
);

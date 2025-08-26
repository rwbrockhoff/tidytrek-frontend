import { TreeIcon2 } from '@/components/icons';
import styles from './saved-pack-image.module.css';

type SavedPackImageProps = {
	src: string | null;
	packName: string;
};

export const SavedPackImage = ({ src, packName }: SavedPackImageProps) => {
	if (src) {
		return (
			<img 
				src={src} 
				alt={packName}
				className={styles.packImage}
				loading="lazy"
			/>
		);
	}
	
	return (
		<div className={styles.defaultContainer}>
			<TreeIcon2 className={styles.defaultIcon} />
		</div>
	);
};
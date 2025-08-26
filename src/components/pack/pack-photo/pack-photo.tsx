import { useState, useEffect } from 'react';
import { cn, mx } from '@/styles/utils';
import styles from './pack-photo.module.css';
import { Dimmer, Spinner } from '@/components/primitives';
import { DeletePhotoButton } from '@/components/media';
import { TreeIcon2 } from '@/components/icons';
import { UploadFile } from '@/components/upload-file/upload-file';

type PackPhotoProps = {
	src: string;
	packId: number;
	uploadEnabled: boolean;
	isPending: boolean;
	onUpload: (formData: FormData) => void;
	onDelete?: () => void;
	rounded?: boolean;
};

export const PackPhoto = (props: PackPhotoProps) => {
	const { src, packId, uploadEnabled = false, isPending, onUpload, onDelete, rounded = false } = props;
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		if (isPending) setShowButton(false);
	}, [isPending]);

	const displayDimmer = uploadEnabled && (isPending || showButton);
	const displayDeleteButton = src && onDelete && showButton && !isPending;
	return (
		<div
			className={cn(styles.container, mx.uploadHoverContainer)}
			onMouseOver={() => setShowButton(true)}
			onMouseLeave={() => setShowButton(false)}>
			{displayDeleteButton && (
				<DeletePhotoButton disabled={isPending} onClick={onDelete} />
			)}

			{src ? (
				<img
					src={src}
					alt="upload custom pack photo"
					className={cn(styles.packPhoto, rounded && styles.rounded)}
					loading="lazy"
				/>
			) : (
				<div className={cn(styles.defaultPack, rounded && styles.rounded)}>
					<TreeIcon2 
						className={cn('lucide', styles.defaultIcon)}
						style={{ width: '48px', height: '48px' }}
					/>
				</div>
			)}

			<Spinner active={isPending} absoluteCenter size="3" />

			{uploadEnabled && (
				<div className={styles.uploadContainer}>
					<UploadFile
						fileId={`pack-photo-upload-${packId}`}
						fileName="packPhoto"
						isPending={isPending}
						onUpload={onUpload}
					/>
				</div>
			)}
			<Dimmer active={displayDimmer} className={styles.dimmer} />
		</div>
	);
};

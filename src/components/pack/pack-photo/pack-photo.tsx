import { useState, useEffect } from 'react';
import { cn, mx } from '@/styles/utils';
import styles from './pack-photo.module.css';
import { Dimmer, Spinner } from '@/components/primitives';
import { DeletePhotoButton } from '@/components/media';
import { TreeIcon2 } from '@/components/icons';
import { UploadFile } from '@/components';

type PackPhotoProps = {
	src: string;
	packId: number;
	uploadEnabled: boolean;
	isPending: boolean;
	onUpload: (formData: FormData) => void;
	onDelete?: () => void;
};

export const PackPhoto = (props: PackPhotoProps) => {
	const { src, packId, uploadEnabled = false, isPending, onUpload, onDelete } = props;
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
					className={styles.packPhoto}
					loading="lazy"
				/>
			) : (
				<div className={styles.defaultPack}>
					<TreeIcon2 className={cn('lucide', styles.defaultIcon)} />
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

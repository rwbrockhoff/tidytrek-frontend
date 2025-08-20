import styles from './banner-photo.module.css';
import { useState } from 'react';
import { cn, mx } from '@/styles/utils';
import { UploadFile } from '@/components';
import { Dimmer, Spinner } from '@/components/primitives';

type BannerPhotoProps = {
	bannerPhotoUrl: string | undefined;
	isPending: boolean;
	uploadEnabled: boolean;
	onUpload: (formData: FormData) => void;
};

export const BannerPhoto = (props: BannerPhotoProps) => {
	const { bannerPhotoUrl, isPending, uploadEnabled = false, onUpload } = props;
	const [showUploadMode, setShowUploadMode] = useState(false);

	const dimmerEnabled = uploadEnabled && (isPending || showUploadMode);
	return (
		<div
			className={cn(styles.bannerContainer, mx.uploadHoverContainer)}
			onMouseOver={() => setShowUploadMode(true)}
			onMouseLeave={() => setShowUploadMode(false)}>
			{bannerPhotoUrl ? (
				<img
					className={styles.bannerImage}
					src={bannerPhotoUrl}
					alt="landscape profile banner photo"
				/>
			) : (
				<div className={styles.bannerGradient} />
			)}

			<Spinner active={isPending} size="4" absoluteCenter />

			<Dimmer active={dimmerEnabled} className={styles.styledDimmer} />

			{uploadEnabled && (
				<div className={styles.uploadContainer}>
					<UploadFile
						fileId="profile-banner-photo"
						fileName="bannerPhoto"
						isPending={isPending}
						onUpload={onUpload}
					/>
				</div>
			)}
		</div>
	);
};

import styles from './banner-photo.module.css';
import { useState } from 'react';
import { cn, mx } from '@/styles/utils';
import { UploadFile } from '@/components';
import { Dimmer, Spinner } from '@/components/primitives';

type BannerPhotoProps = {
	bannerPhotoUrl: string | undefined | null;
	isPending: boolean;
	uploadEnabled: boolean;
	onUpload: (formData: FormData) => void;
};

export const BannerPhoto = (props: BannerPhotoProps) => {
	const { bannerPhotoUrl, isPending, uploadEnabled = false, onUpload } = props;
	const [showUploadMode, setShowUploadMode] = useState(false);
	const [imageLoading, setImageLoading] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	const handleImageLoadStart = () => setImageLoading(true);

	const handleImageLoad = () => {
		setImageLoading(false);
		setImageError(false);
		setImageLoaded(true);
	};

	const handleImageError = () => {
		setImageLoading(false);
		setImageError(true);
	};

	const renderBannerContent = () => {
		// Show image if we have a URL and no error
		if (bannerPhotoUrl && !imageError) {
			return (
				<img
					className={cn(styles.bannerImage, imageLoaded && styles.bannerImageLoaded)}
					src={bannerPhotoUrl}
					alt="landscape profile banner photo"
					onLoadStart={handleImageLoadStart}
					onLoad={handleImageLoad}
					onError={handleImageError}
				/>
			);
		}

		// Show gradient only when confirmed no image (not loading)
		if (bannerPhotoUrl === null && !imageLoading) {
			return <div className={styles.bannerGradient} />;
		}

		// Show nothing while loading - defaults to a skeleton-like bg-tertiary
		return null;
	};

	const dimmerEnabled = uploadEnabled && (isPending || showUploadMode);

	return (
		<div
			className={cn(styles.bannerContainer, mx.uploadHoverContainer)}
			onMouseOver={() => setShowUploadMode(true)}
			onMouseLeave={() => setShowUploadMode(false)}>
			{renderBannerContent()}

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

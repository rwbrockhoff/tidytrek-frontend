import { useState } from 'react';
import { Link } from '@/components/ui';
import { DeletePhotoButton } from '../delete-photo-button/delete-photo-button';
import { Dimmer, Spinner } from '@/components/primitives';
import { UploadFile } from '@/components/upload-file/upload-file';
import { defaultAvatarPhoto } from '@/utils';
import { cn, mx } from '@/styles/utils';
import styles from './avatar.module.css';

type AvatarProps = {
	src: string | undefined;
	size?: Size;
	link?: string;
	withBorder?: boolean;
	uploadEnabled?: boolean;
	isPending?: boolean;
	onUpload?: (formData: FormData) => void;
	onDelete?: () => void;
};

export const Avatar = (props: AvatarProps) => {
	const {
		src,
		size = 'big',
		link,
		withBorder = false,
		uploadEnabled = false,
		isPending,
		onDelete,
		onUpload,
	} = props;

	const [showButton, setShowButton] = useState(false);

	const hasLink = link ? true : false;
	const photoSource = src ? src : defaultAvatarPhoto;
	const displayDeleteButton = onDelete && src && showButton && !isPending;
	const displayDimmer = uploadEnabled && (isPending || showButton);

	return (
		<Link to={link} enabled={hasLink}>
			<div
				className={cn(styles.outerContainer, styles[size], mx.uploadHoverContainer)}
				onMouseOver={() => setShowButton(true)}
				onMouseLeave={() => setShowButton(false)}>
				{displayDeleteButton && (
					<DeletePhotoButton disabled={isPending} onClick={onDelete} />
				)}

				<div
					className={cn(
						styles.innerContainer,
						styles[size],
						withBorder && styles.withBorder,
					)}>
					<Spinner active={isPending} absoluteCenter />

					<Dimmer active={displayDimmer} className={styles.dimmer} />

					{uploadEnabled && (
						<div className={styles.uploadContainer}>
							<UploadFile
								fileId="profile-photo-upload"
								fileName="profilePhoto"
								isPending={isPending}
								onUpload={onUpload}
							/>
						</div>
					)}

					<img src={photoSource} className={styles.avatar} alt="user profile photo" />
				</div>
			</div>
		</Link>
	);
};

type Size = 'small' | 'medium' | 'big' | 'large';

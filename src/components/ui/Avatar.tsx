import { useState } from 'react';
import { DeleteButton, Link, Spinner } from '@/components/ui';
import Dimmer from './Dimmer';
import { UploadFile } from '../upload-file';
import { defaultAvatarPhoto } from '../../utils/defaultPhotos';
import { cn } from '@/styles/utils/cn';
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
		<Link link={link} enabled={hasLink}>
			<div
				className={cn(styles.outerContainer, styles[size])}
				onMouseOver={() => setShowButton(true)}
				onMouseLeave={() => setShowButton(false)}>
				{displayDeleteButton && <DeleteButton disabled={isPending} onClick={onDelete} />}

				<div className={cn(styles.innerContainer, styles[size], withBorder && styles.withBorder)}>
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

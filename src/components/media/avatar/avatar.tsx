import { useState } from 'react';
import { Link } from '@/components/ui';
import { DeletePhotoButton } from '../delete-photo-button/delete-photo-button';
import { Dimmer, Spinner } from '@/components/primitives';
import { UploadFile } from '@/components/upload-file/upload-file';
import { UserIcon } from '@/components/icons';
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

const sizeStyles = {
	sm: { width: '50px', height: '50px' },
	md: { width: '100px', height: '100px' },
	lg: { width: '150px', height: '150px' },
};

const iconSizeStyles = {
	sm: { width: '44px', height: '44px' },
	md: { width: '90px', height: '90px' },
	lg: { width: '150px', height: '150px' },
};

export const Avatar = (props: AvatarProps) => {
	const {
		src,
		size = 'md',
		link,
		withBorder = false,
		uploadEnabled = false,
		isPending,
		onDelete,
		onUpload,
	} = props;

	const [showButton, setShowButton] = useState(false);

	const hasLink = link ? true : false;
	const displayDeleteButton = onDelete && src && showButton && !isPending;
	const displayDimmer = uploadEnabled && (isPending || showButton);

	return (
		<Link to={link} enabled={hasLink}>
			<div
				className={cn(styles.outerContainer, styles[size], mx.uploadHoverContainer)}
				onMouseOver={() => setShowButton(true)}
				onMouseLeave={() => setShowButton(false)}
				style={sizeStyles[size]}>
				{displayDeleteButton && (
					<DeletePhotoButton disabled={isPending} onClick={onDelete} />
				)}

				<div
					className={cn(
						styles.innerContainer,
						styles[size],
						withBorder && styles.withBorder,
					)}
					style={sizeStyles[size]}>
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

					{src ? (
						<img src={src} className={styles.avatar} alt="user profile photo" />
					) : (
						<div className={cn(styles.defaultAvatar, styles[size])}>
							<UserIcon 
								className={cn('lucide', styles.defaultIcon, styles[size])}
								style={iconSizeStyles[size]}
							/>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
};

type Size = 'sm' | 'md' | 'lg';

import styled from 'styled-components';
import { useState } from 'react';
import { DeleteButton, Link, Spinner } from '@/components/ui';
import Dimmer from './Dimmer';
import { UploadFile } from '../upload-file';
import { defaultAvatarPhoto } from '../../utils/defaultPhotos';

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
			<OuterContainer
				$size={size}
				$withBorder={withBorder}
				onMouseOver={() => setShowButton(true)}
				onMouseLeave={() => setShowButton(false)}>
				{displayDeleteButton && <DeleteButton disabled={isPending} onClick={onDelete} />}

				<InnerContainer $size={size} $withBorder={withBorder}>
					<Spinner active={isPending} absoluteCenter />

					<StyledDimmer active={displayDimmer} />

					{uploadEnabled && showButton && (
						<UploadContainer>
							<UploadFile
								fileId="profile-photo-upload"
								fileName="profilePhoto"
								isPending={isPending}
								onUpload={onUpload}
							/>
						</UploadContainer>
					)}

					<StyledAvatar src={photoSource} $size={size} alt="user profile photo" />
				</InnerContainer>
			</OuterContainer>
		</Link>
	);
};

type Size = 'small' | 'medium' | 'big' | 'large';
const avatarBorderWidth = '3px';

const sizeChart = {
	large: '150px',
	big: '100px',
	medium: '75px',
	small: '50px',
};

// width and height based on Size type
const InnerContainer = styled.div<{ $size: Size; $withBorder: boolean }>`
	position: relative;
	overflow: hidden;
	${(props) => props.theme.mx.wh(sizeChart[props.$size])};
	border: ${(props) => (props.$withBorder ? `${avatarBorderWidth} solid white` : 'none')};
	border-radius: 50%;
`;

const OuterContainer = styled(InnerContainer)`
	overflow: visible;
	border: none;
	border-radius: 0px;
`;

const StyledAvatar = styled.img<{ $size?: Size }>`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const StyledDimmer = styled(Dimmer)`
	width: 100%;
	height: 100%;
`;

const UploadContainer = styled.div`
	${({ theme: t }) => t.mx.absoluteCenter()}
`;

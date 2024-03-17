import styled from 'styled-components';
import { useState } from 'react';
import { DeleteButton, Link } from '@/components/ui';
import { Loader } from './TidyUI';
import Dimmer from './Dimmer';
import { UploadFile } from '../upload-file';
import { defaultAvatarPhoto } from './defaultPhotos';

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
					<Loader active={isPending} inverted />

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
	large: { widthOrHeight: '150px', borderRadius: '75px' },
	big: { widthOrHeight: '100px', borderRadius: '50px' },
	medium: { widthOrHeight: '75px', borderRadius: '38px' },
	small: { widthOrHeight: '50px', borderRadius: '25px' },
};

// width and height based on Size type
const InnerContainer = styled.div<{ $size: Size; $withBorder: boolean }>`
	position: relative;
	overflow: hidden;
	border: ${(props) => (props.$withBorder ? `${avatarBorderWidth} solid white` : 'none')};
	width: ${(props) => props.$size && sizeChart[props.$size].widthOrHeight};
	height: ${(props) => props.$size && sizeChart[props.$size].widthOrHeight};
	border-radius: ${(props) => props.$size && sizeChart[props.$size].borderRadius};
	${({ theme: t }) => t.mx.flexCenter()}
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

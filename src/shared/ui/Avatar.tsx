import styled from 'styled-components';
import { Button, Loader } from 'semantic-ui-react';
import { CustomLink } from './CustomLinks';
import { useState } from 'react';
import Dimmer from './Dimmer';
import UploadFile from './UploadFile';
import { flexCenter } from '../mixins/mixins';

const defaultPhotoUrl =
	'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

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

const Avatar = (props: AvatarProps) => {
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
	const photoSource = src ? src : defaultPhotoUrl;
	const displayDeleteButton = onDelete && src && showButton && !isPending;
	const displayDimmer = uploadEnabled && (isPending || showButton);

	return (
		<CustomLink link={link} enabled={hasLink}>
			<OuterContainer
				$size={size}
				$withBorder={withBorder}
				onMouseOver={() => setShowButton(true)}
				onMouseLeave={() => setShowButton(false)}>
				{displayDeleteButton && (
					<DeleteButton
						circular
						icon="delete"
						size="mini"
						onClick={onDelete}
						disabled={isPending}
					/>
				)}

				<InnerContainer $size={size} $withBorder={withBorder}>
					{isPending && <StyledLoader active inverted $size={size} />}

					<StyledDimmer active={displayDimmer} />

					{uploadEnabled && showButton && (
						<UploadContainer $size={size}>
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
		</CustomLink>
	);
};

export default Avatar;

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
	${flexCenter};
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
	position: absolute;
	width: 100%;
	height: 100%;
`;

const UploadContainer = styled.div<{ $size: Size }>`
	position: absolute;
	top: calc(${(props) => props.$size && sizeChart[props.$size].widthOrHeight} / 2) - 2em;
	left: calc(${(props) => props.$size && sizeChart[props.$size].widthOrHeight} / 2) - 2em;
`;

const StyledLoader = styled(Loader)<{ $size: Size }>`
	&&& {
		top: calc(${(props) => props.$size && sizeChart[props.$size].widthOrHeight} / 2) -
			2.28571429rem;
		left: calc(${(props) => props.$size && sizeChart[props.$size].widthOrHeight} / 2) -
			2.28571429rem;
	}
`;

const DeleteButton = styled(Button)`
	position: absolute;
	z-index: 1;
	top: -10px;
	left: 65px;
`;

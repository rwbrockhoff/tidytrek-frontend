import styled from 'styled-components';
import { Button, Loader } from 'semantic-ui-react';
import { CustomLink } from './CustomLinks';
import { useState } from 'react';
import Dimmer from './Dimmer';
import UploadFile from './UploadFile';

const defaultPhotoUrl =
	'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

type AvatarProps = {
	src: string | undefined;
	size?: Size;
	link?: string;
	withBorder?: boolean;
	uploadEnabled?: boolean;
	margin?: string;
	isPending?: boolean;
	onUpload?: (formData: FormData) => void;
	onDelete?: () => void;
};

const Avatar = (props: AvatarProps) => {
	const {
		src,
		size = 'big',
		link,
		margin = '0px',
		withBorder = false,
		uploadEnabled = false,
		isPending,
		onDelete,
		onUpload,
	} = props;

	const [showButton, setShowButton] = useState(false);

	const hasLink = link ? true : false;
	const photoSource = src ? src : defaultPhotoUrl;
	const display = onDelete && src && showButton;
	const displayDimmer = uploadEnabled && (isPending || showButton);

	return (
		<CustomLink link={link} enabled={hasLink}>
			<InnerContainer
				onMouseOver={() => setShowButton(true)}
				onMouseLeave={() => setShowButton(false)}>
				{display && (
					<StyledButton circular icon="delete" size="mini" onClick={onDelete} />
				)}

				{isPending && <StyledLoader active inverted $size={size} />}

				<StyledDimmer $size={size} active={displayDimmer} />

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

				<StyledAvatar
					src={photoSource}
					$margin={margin}
					$size={size}
					$withBorder={withBorder}
					alt="user profile photo"
				/>
			</InnerContainer>
		</CustomLink>
	);
};

export default Avatar;

type Size = 'small' | 'medium' | 'big' | 'large';
const avatarBorderWidth = '3px';

const StyledAvatar = styled.img<{
	$size?: Size;
	$margin?: string;
	$withBorder?: boolean;
}>`
	width: ${(props) => props.$size && sizeChart[props.$size].widthOrHeight};
	height: ${(props) => props.$size && sizeChart[props.$size].widthOrHeight};
	border-radius: ${(props) => props.$size && sizeChart[props.$size].borderRadius};
	border: ${(props) =>
		props.$withBorder ? `${avatarBorderWidth} solid white` : 'inherit'};
	margin: ${(props) => (props.$margin ? props.$margin : 'inherit')};
	object-fit: cover;
	opacity: 1;

	:hover {
		opacity: 0.2;
	}
`;

const sizeChart = {
	large: { widthOrHeight: '150px', borderRadius: '75px' },
	big: { widthOrHeight: '100px', borderRadius: '50px' },
	medium: { widthOrHeight: '75px', borderRadius: '38px' },
	small: { widthOrHeight: '50px', borderRadius: '25px' },
};

// width and height based on Size type (subtracting any added border width)
const StyledDimmer = styled(Dimmer)<{ $size: Size; withBorder?: boolean }>`
	width: calc(
		${(props) => props.$size && sizeChart[props.$size].widthOrHeight} -
			${avatarBorderWidth}
	);
	height: calc(
		${(props) => props.$size && sizeChart[props.$size].widthOrHeight} -
			${avatarBorderWidth}
	);
	border-radius: ${(props) => props.$size && sizeChart[props.$size].borderRadius};
`;

const UploadContainer = styled.div`
	position: absolute;
	top: 38px;
	left: 38px;
`;

const StyledLoader = styled(Loader)<{ $size: Size }>`
	&&& {
		left: calc(${(props) => props.$size && sizeChart[props.$size].widthOrHeight} / 2);
	}
`;

const StyledButton = styled(Button)`
	position: absolute;
	top: -10px;
	left: 65px;
`;

const InnerContainer = styled.div`
	position: relative;
	width: fit-content%;
`;

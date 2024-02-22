import styled from 'styled-components';
import { Button, Loader } from 'semantic-ui-react';
import { CustomLink } from './CustomLinks';
import { useState } from 'react';

const defaultPhotoUrl =
	'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

type AvatarProps = {
	src: string | undefined;
	size?: Size;
	link?: string;
	margin?: string;
	isPending?: boolean;
	onDelete?: () => void;
};

const Avatar = ({
	src,
	size = 'big',
	link,
	margin = '0px',
	isPending,
	onDelete,
}: AvatarProps) => {
	const [showButton, setShowButton] = useState(false);

	const hasLink = link ? true : false;
	const photoSource = src ? src : defaultPhotoUrl;
	const display = onDelete && src && showButton;
	return (
		<CustomLink link={link} enabled={hasLink}>
			<InnerContainer
				onMouseOver={() => setShowButton(true)}
				onMouseLeave={() => setShowButton(false)}>
				{display && (
					<StyledButton circular icon="delete" size="mini" onClick={onDelete} />
				)}
				{isPending && (
					<>
						<StyledLoader active inverted />
						<Background />
					</>
				)}

				<StyledAvatar
					src={photoSource}
					$margin={margin}
					$size={size}
					alt="user profile photo"
				/>
			</InnerContainer>
		</CustomLink>
	);
};

export default Avatar;

type Size = 'big' | 'medium' | 'small';

const StyledAvatar = styled.img<{ $size?: Size; $margin?: string }>`
	width: ${(props) => props.$size && sizeChart[props.$size].widthOrHeight};
	height: ${(props) => props.$size && sizeChart[props.$size].widthOrHeight};
	border-radius: ${(props) => props.$size && sizeChart[props.$size].borderRadius};

	margin: ${(props) => (props.$margin ? props.$margin : 'inherit')};
	object-fit: cover;
	opacity: 1;

	:hover {
		opacity: 0.2;
	}
`;

const sizeChart = {
	big: { widthOrHeight: '100px', borderRadius: '50px' },
	medium: { widthOrHeight: '75px', borderRadius: '38px' },
	small: { widthOrHeight: '50px', borderRadius: '25px' },
};

const Background = styled.div`
	position: absolute;
	width: 100px;
	height: 100px;
	border-radius: 50px;
	margin: 10px;
	background-color: black;
	opacity: 0.5;
`;

const StyledLoader = styled(Loader)`
	&&& {
		left: 60px;
	}
`;

const StyledButton = styled(Button)`
	position: absolute;
	top: 0;
	left: 75px;
`;

const InnerContainer = styled.div`
	position: relative;
	width: fit-content%;
`;

import styled from 'styled-components';
import { CustomLink } from './CustomLinks';

const defaultPhotoUrl =
	'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const Avatar = ({ src, link }: { src: string | undefined; link?: string }) => {
	const hasLink = link ? true : false;
	const photoSource = src ? src : defaultPhotoUrl;
	return (
		<CustomLink link={link} enabled={hasLink}>
			<StyledAvatar src={photoSource} alt="user profile photo" size="big" />
		</CustomLink>
	);
};

export default Avatar;

type Size = 'big' | 'small';

const StyledAvatar = styled.img<{ size: Size }>`
	width: ${(props) => (props.size === 'big' ? '100px' : '25px')};
	height: ${(props) => (props.size === 'big' ? '100px' : '25px')};
	border-radius: ${(props) => (props.size === 'big' ? '50px' : '12px')};
	margin: 10px;
`;

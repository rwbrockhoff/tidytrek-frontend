import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { themeColor } from '../mixins/mixins';

type LinkProps = {
	url: string;
	text: string;
	showIcon?: boolean;
};

const Link = ({ url, text, showIcon = false }: LinkProps) => {
	if (url) {
		return (
			<StyledLink href={url} target="_blank" rel="noopener noreferrer">
				<p>
					{showIcon && <Icon name="linkify" />}
					{text}
				</p>
			</StyledLink>
		);
	} else {
		return <p>{text}</p>;
	}
};

export default Link;

const StyledLink = styled.a`
	p {
		margin-bottom: 10px;
		${themeColor('primary')}
	}
	i {
		margin-right: 5px;
	}
`;

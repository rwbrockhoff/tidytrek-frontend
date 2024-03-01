import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { themeColor } from '../mixins/mixins';

type LinkProps = {
	link: string | undefined;
	externalLink?: boolean;
	enabled?: boolean;
	children: React.ReactNode;
};

export const Link = ({ link, externalLink, enabled = true, children }: LinkProps) => {
	if (!enabled || !link) return children;
	if (externalLink) {
		return (
			<StyledLink to={link} target="_blank" rel="noopener noreferrer">
				{children}
			</StyledLink>
		);
	} else {
		return <StyledLink to={link}>{children}</StyledLink>;
	}
};

const StyledLink = styled(RouterLink)`
	${themeColor('primary')}
	&:hover {
		${themeColor('primary')}
		opacity: 0.9;
	}
`;

type DisplayLinkProps = {
	url: string;
	text: string;
	showIcon?: boolean;
};

export const DisplayLink = ({ url, text, showIcon = false }: DisplayLinkProps) => {
	if (url) {
		return (
			<StyledBasicLink href={url} target="_blank" rel="noopener noreferrer">
				<p>
					{showIcon && <Icon name="linkify" />}
					{text}
				</p>
			</StyledBasicLink>
		);
	} else {
		return <p>{text}</p>;
	}
};

const StyledBasicLink = styled.a`
	p {
		margin-bottom: 10px;
		${themeColor('primary')}
	}
	i {
		margin-right: 5px;
	}
`;

export const cleanUpLink = (link: string) => {
	if (!link) return '';
	if (link.includes('http:')) return link.replace('http:', 'https:');
	if (link.includes('https://')) return link;
	else return `https://${link}`;
};

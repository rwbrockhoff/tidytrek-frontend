import { Link as RouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { themeColor } from '@/styles/mixins';

type LinkProps = {
	link: string | undefined;
	children: React.ReactNode;
	externalLink?: boolean;
	enabled?: boolean;
};

export const Link = (props: LinkProps) => {
	const { link, externalLink, enabled = true, children } = props;

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
	margin?: string;
};

export const DisplayLink = (props: DisplayLinkProps) => {
	const { url, text, showIcon = false, margin } = props;
	if (url) {
		return (
			<StyledBasicLink
				href={url}
				$margin={margin}
				target="_blank"
				rel="noopener noreferrer">
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

const StyledBasicLink = styled.a<{ $margin?: string }>`
	p {
		${themeColor('primary')}
		${({ $margin }) =>
			$margin &&
			css`
				margin: ${$margin};
			`}
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

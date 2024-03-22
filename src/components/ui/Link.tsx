import { Link as RouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FaLink } from 'react-icons/fa';
import { Icon } from '@/components/ui';
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
	display: flex;
	align-items: center;
	height: 100%;
	${themeColor('primary')}
	&:hover {
		${themeColor('primary')}
		filter: brightness(95%);
	}
	svg {
		margin: 0px 5px;
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
				<p style={{ display: 'inline-flex' }}>
					{showIcon && (
						<Icon>
							<FaLink />
						</Icon>
					)}
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
	span {
		margin-right: 5px;
	}
`;

export const cleanUpLink = (link: string) => {
	if (!link) return '';
	if (link.includes('http:')) return link.replace('http:', 'https:');
	if (link.includes('https://')) return link;
	else return `https://${link}`;
};

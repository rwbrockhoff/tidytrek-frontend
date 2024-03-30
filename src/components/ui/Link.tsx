import { Link as RouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FaLink } from 'react-icons/fa';
import { Icon } from '@/components/ui';
import { themeColor } from '@/styles/mixins';
import { Text } from '@radix-ui/themes';

type LinkProps = {
	link: string | undefined;
	children: React.ReactNode;
	externalLink?: boolean;
	enabled?: boolean;
	className?: string;
};

export const Link = (props: LinkProps) => {
	const { link, externalLink, enabled = true, className = '', children } = props;

	if (!enabled || !link) return children;
	if (externalLink) {
		return (
			<StyledLink
				to={link}
				target="_blank"
				rel="noopener noreferrer"
				className={className}>
				{children}
			</StyledLink>
		);
	} else {
		return (
			<StyledLink to={link} className={className} onClick={() => window.scrollTo(0, 0)}>
				{children}
			</StyledLink>
		);
	}
};

const StyledLink = styled(RouterLink)`
	display: flex;
	align-items: center;
	height: 100%;
	color: var(--jade-10);

	&:hover {
		color: var(--jade-10);
		filter: var(--hover-dark-1);
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
				<Text style={{ display: 'inline-flex' }}>
					{showIcon && (
						<Icon>
							<FaLink />
						</Icon>
					)}
					{text}
				</Text>
			</StyledBasicLink>
		);
	} else {
		return <p>{text}</p>;
	}
};

const StyledBasicLink = styled.a<{ $margin?: string }>`
	span {
		${themeColor('primary')}
		${({ $margin }) =>
			$margin &&
			css`
				margin: ${$margin};
			`}
	}
	&:hover {
		filter: var(--hover-dark);
	}
`;

export const cleanUpLink = (link: string) => {
	if (!link) return '';
	if (link.includes('http:')) return link.replace('http:', 'https:');
	if (link.includes('https://')) return link;
	else return `https://${link}`;
};

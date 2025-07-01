import { Link as RouterLink } from 'react-router-dom';
import { frontendURL } from '@/api/tidytrekAPI';
import { FaLink } from 'react-icons/fa';
import { Icon } from '@/components/ui';
import { Text } from '@radix-ui/themes';
import { cn } from '@/styles/utils';
import styles from './link.module.css';

type LinkProps = {
	to: string | undefined;
	children: React.ReactNode;
	externalLink?: boolean;
	enabled?: boolean;
	className?: string;
};

export const Link = (props: LinkProps) => {
	const { to, externalLink, enabled = true, className = '', children } = props;

	if (!enabled || !to) return children;

	if (externalLink) {
		return (
			<RouterLink
				to={to}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(styles.link, className)}>
				{children}
			</RouterLink>
		);
	} else {
		return (
			<RouterLink
				to={to}
				className={cn(styles.link, className)}>
				{children}
			</RouterLink>
		);
	}
};

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
			<a
				href={url}
				className={styles.displayLink}
				target="_blank"
				rel="noopener noreferrer"
				style={{ margin }}>
				<Text style={{ display: 'inline-flex' }}>
					{showIcon && (
						<Icon>
							<FaLink />
						</Icon>
					)}
					{text}
				</Text>
			</a>
		);
	} else {
		return <p>{text}</p>;
	}
};

type LandingLinkProps = {
	to?: string;
	children: React.ReactNode;
};

export const LandingLink = ({ to = '', children }: LandingLinkProps) => {
	const href = to.startsWith('/') ? `${frontendURL}${to}` : `${frontendURL}/${to}`;
	return (
		<a href={href} rel="noopener noreferrer">
			{children}
		</a>
	);
};

export const cleanUpLink = (link: string) => {
	if (!link) return '';
	if (link.includes('http:')) return link.replace('http:', 'https:');
	if (link.includes('https://')) return link;
	else return `https://${link}`;
};
